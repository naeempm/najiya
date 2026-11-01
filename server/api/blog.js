import mongoose from 'mongoose';
import { STARTER_POSTS } from './blogSeed.js';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blogPostSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: SLUG_PATTERN,
    },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: '', trim: true },
    // Markdown; the website renders it without allowing raw HTML
    content: { type: String, default: '' },
    coverImage: { type: String, default: '', trim: true },
    coverAlt: { type: String, default: '', trim: true },
    category: { type: String, default: '', trim: true },
    tags: { type: [String], default: [] },
    metaTitle: { type: String, default: '', trim: true },
    metaDescription: { type: String, default: '', trim: true },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

blogPostSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export function slugify(text = '') {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
}

// Only these fields can be set from the admin panel
function postFieldsFrom(body = {}) {
  const fields = {};
  for (const key of ['title', 'excerpt', 'content', 'coverImage', 'coverAlt', 'category', 'metaTitle', 'metaDescription']) {
    if (typeof body[key] === 'string') fields[key] = body[key];
  }
  if (typeof body.slug === 'string') fields.slug = slugify(body.slug);
  if (Array.isArray(body.tags)) {
    fields.tags = body.tags.map((tag) => String(tag).trim()).filter(Boolean);
  } else if (typeof body.tags === 'string') {
    fields.tags = body.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  }
  if (typeof body.published === 'boolean') fields.published = body.published;
  if (body.publishedAt) {
    const date = new Date(body.publishedAt);
    if (!Number.isNaN(date.getTime())) fields.publishedAt = date;
  }
  return fields;
}

// The website prerenders blog posts at build time, so a change to a live
// post asks Vercel to rebuild it. Set CLIENT_DEPLOY_HOOK_URL to enable.
async function triggerSiteRebuild() {
  const hook = process.env.CLIENT_DEPLOY_HOOK_URL?.trim();
  if (!hook) return;
  try {
    await fetch(hook, { method: 'POST', signal: AbortSignal.timeout(5000) });
  } catch (error) {
    console.error('[Blog] Could not trigger site rebuild:', error.message);
  }
}

function sendSaveError(error, response, next) {
  if (error?.code === 11000) {
    return response.status(409).json({ error: 'Another post already uses this URL slug.' });
  }
  if (error?.name === 'ValidationError') {
    return response.status(400).json({ error: 'Please add a title and a valid URL slug (lowercase letters, numbers and dashes).' });
  }
  return next(error);
}

export function registerBlogRoutes(app, authenticateToken) {
  // Published posts, newest first. ?include=content adds the full text
  // (used by the website's prerender step).
  app.get('/api/blog', async (request, response, next) => {
    try {
      const query = BlogPost.find({ published: true }).sort({ publishedAt: -1 });
      if (request.query.include !== 'content') query.select('-content');
      response.json(await query);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/blog/:slug', async (request, response, next) => {
    try {
      const post = await BlogPost.findOne({ slug: request.params.slug, published: true });
      if (!post) {
        return response.status(404).json({ error: 'Post not found.' });
      }
      response.json(post);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/admin/blog', authenticateToken, async (_request, response, next) => {
    try {
      response.json(await BlogPost.find().sort({ updatedAt: -1 }));
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/admin/blog', authenticateToken, async (request, response, next) => {
    try {
      const fields = postFieldsFrom(request.body);
      if (!fields.slug) fields.slug = slugify(fields.title);
      if (fields.published && !fields.publishedAt) fields.publishedAt = new Date();
      const post = await BlogPost.create(fields);
      if (post.published) await triggerSiteRebuild();
      response.status(201).json(post);
    } catch (error) {
      sendSaveError(error, response, next);
    }
  });

  app.put('/api/admin/blog/:id', authenticateToken, async (request, response, next) => {
    try {
      const post = await BlogPost.findById(request.params.id);
      if (!post) {
        return response.status(404).json({ error: 'Post not found.' });
      }
      const wasPublished = post.published;
      post.set(postFieldsFrom(request.body));
      if (!post.slug) post.slug = slugify(post.title);
      if (post.published && !post.publishedAt) post.publishedAt = new Date();
      await post.save();
      if (wasPublished || post.published) await triggerSiteRebuild();
      response.json(post);
    } catch (error) {
      sendSaveError(error, response, next);
    }
  });

  app.delete('/api/admin/blog/:id', authenticateToken, async (request, response, next) => {
    try {
      const post = await BlogPost.findByIdAndDelete(request.params.id);
      if (!post) {
        return response.status(404).json({ error: 'Post not found.' });
      }
      if (post.published) await triggerSiteRebuild();
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  // Adds the starter articles as drafts; posts that already exist are skipped
  app.post('/api/admin/blog/seed', authenticateToken, async (_request, response, next) => {
    try {
      const existing = new Set(
        (await BlogPost.find({ slug: { $in: STARTER_POSTS.map((post) => post.slug) } }).select('slug'))
          .map((post) => post.slug),
      );
      const missing = STARTER_POSTS.filter((post) => !existing.has(post.slug));
      if (missing.length) {
        await BlogPost.insertMany(missing.map((post) => ({ ...post, published: false })));
      }
      response.json({ added: missing.length, skipped: existing.size });
    } catch (error) {
      next(error);
    }
  });
}
