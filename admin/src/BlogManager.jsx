import { useEffect, useRef, useState } from 'react';

const EMPTY_POST = {
  title: '',
  slug: '',
  excerpt: '',
  category: '',
  tags: '',
  coverImage: '',
  coverAlt: '',
  metaTitle: '',
  metaDescription: '',
  content: '',
  published: false,
  publishedAt: '',
};

function toDateInput(value) {
  return value ? new Date(value).toISOString().slice(0, 10) : '';
}

function formatDate(value) {
  return value
    ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';
}

function CharCount({ value, max }) {
  const length = value.length;
  return (
    <span className={`field-hint ${length > max ? 'blog-over-limit' : ''}`}>
      {length}/{max} characters
    </span>
  );
}

export default function BlogManager({ apiUrl, token, clientUrl, showToast }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const authHeaders = { Authorization: `Bearer ${token}` };

  async function loadPosts() {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/admin/blog`, { headers: authHeaders });
      if (!response.ok) throw new Error('Could not load blog posts.');
      setPosts(await response.json());
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function editPost(post) {
    setEditing({
      ...EMPTY_POST,
      ...post,
      tags: (post.tags || []).join(', '),
      publishedAt: toDateInput(post.publishedAt),
    });
  }

  function updateField(field, value) {
    setEditing((current) => ({ ...current, [field]: value }));
  }

  async function savePost() {
    if (!editing.title.trim()) {
      showToast('Please add a title.', 'error');
      return;
    }
    setSaving(true);
    try {
      const isNew = !editing.id;
      const response = await fetch(`${apiUrl}/admin/blog${isNew ? '' : `/${editing.id}`}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not save the post.');
      showToast(data.published ? 'Post saved and live on the blog.' : 'Draft saved.', 'success');
      editPost(data);
      loadPosts();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(post) {
    if (!window.confirm(`Delete "${post.title}" permanently?`)) return;
    try {
      const response = await fetch(`${apiUrl}/admin/blog/${post.id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      if (!response.ok) throw new Error('Could not delete the post.');
      showToast('Post deleted.', 'success');
      if (editing?.id === post.id) setEditing(null);
      loadPosts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  async function addStarterPosts() {
    try {
      const response = await fetch(`${apiUrl}/admin/blog/seed`, {
        method: 'POST',
        headers: authHeaders,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not add starter articles.');
      showToast(
        data.added ? `${data.added} starter article(s) added as drafts.` : 'Starter articles are already here.',
        'success',
      );
      loadPosts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  function uploadCover(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showToast('File size must be under 10MB.', 'error');
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const response = await fetch(`${apiUrl}/upload`, {
          method: 'POST',
          headers: { ...authHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result, folder: 'speech_connect/blog' }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Upload failed.');
        updateField('coverImage', data.url);
        showToast('Cover image uploaded.', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  if (editing) {
    return (
      <div className="tab-pane">
        <div className="pane-header">
          <div>
            <h2>{editing.id ? 'Edit post' : 'New post'}</h2>
            <p>Posts stay as drafts until you tick "Published" and save.</p>
          </div>
          <div className="blog-admin-actions">
            <button type="button" className="min-btn secondary sm" onClick={() => setEditing(null)}>
              Back to posts
            </button>
            <button type="button" className="min-btn primary sm" onClick={savePost} disabled={saving}>
              {saving ? 'Saving...' : 'Save post'}
            </button>
          </div>
        </div>

        <div className="grid-two-col">
          <div className="min-card">
            <div className="card-title">Article</div>
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Speech milestones by age"
              />
            </div>
            <div className="input-group">
              <label>URL slug</label>
              <input
                type="text"
                value={editing.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder="Leave blank to create from the title"
              />
              <span className="field-hint">
                The page address: speechconnect.in/blog/{editing.slug || 'your-post-title'}. Avoid changing it after publishing.
              </span>
            </div>
            <div className="input-group">
              <label>Excerpt</label>
              <textarea
                rows="3"
                value={editing.excerpt}
                onChange={(e) => updateField('excerpt', e.target.value)}
                placeholder="One or two sentences shown on the blog list"
              />
            </div>
            <div className="grid-row-two">
              <div className="input-group">
                <label>Category</label>
                <input
                  type="text"
                  value={editing.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  placeholder="Child development"
                />
              </div>
              <div className="input-group">
                <label>Tags</label>
                <input
                  type="text"
                  value={editing.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                  placeholder="speech delay, toddlers"
                />
              </div>
            </div>
          </div>

          <div className="min-card">
            <div className="card-title">Publishing & search</div>
            <label className="blog-admin-check">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => updateField('published', e.target.checked)}
              />
              <span>Published (visible on the website)</span>
            </label>
            <div className="input-group">
              <label>Publish date</label>
              <input
                type="date"
                value={editing.publishedAt}
                onChange={(e) => updateField('publishedAt', e.target.value)}
              />
              <span className="field-hint">Leave blank to use the day you publish.</span>
            </div>
            <div className="input-group">
              <label>Search title</label>
              <input
                type="text"
                value={editing.metaTitle}
                onChange={(e) => updateField('metaTitle', e.target.value)}
                placeholder="Shown in Google results; defaults to the title"
              />
              <CharCount value={editing.metaTitle} max={60} />
            </div>
            <div className="input-group">
              <label>Search description</label>
              <textarea
                rows="3"
                value={editing.metaDescription}
                onChange={(e) => updateField('metaDescription', e.target.value)}
                placeholder="Shown under the title in Google; defaults to the excerpt"
              />
              <CharCount value={editing.metaDescription} max={155} />
            </div>
            <div className="input-group">
              <label>Cover image</label>
              {editing.coverImage && (
                <img src={editing.coverImage} alt="" className="blog-admin-cover" />
              )}
              <div className="blog-admin-actions">
                <button
                  type="button"
                  className="min-btn secondary sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : editing.coverImage ? 'Replace image' : 'Upload image'}
                </button>
                {editing.coverImage && (
                  <button type="button" className="min-btn ghost sm" onClick={() => updateField('coverImage', '')}>
                    Remove
                  </button>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={uploadCover} />
            </div>
            {editing.coverImage && (
              <div className="input-group">
                <label>Image description (alt text)</label>
                <input
                  type="text"
                  value={editing.coverAlt}
                  onChange={(e) => updateField('coverAlt', e.target.value)}
                  placeholder="e.g. A mother reading a picture book with her toddler"
                />
              </div>
            )}
          </div>
        </div>

        <div className="min-card blog-admin-content">
          <div className="card-title">Content</div>
          <div className="input-group">
            <textarea
              rows="24"
              value={editing.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Write the article here..."
            />
            <span className="field-hint">
              Formatting: start a line with ## for a heading or ### for a smaller one, - for a bullet point,
              1. for a numbered list and &gt; for a quote. Use **bold**, *italic* and [link text](/appointment).
              Links starting with / point to pages on this website.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-pane">
      <div className="pane-header">
        <div>
          <h2>Blog posts</h2>
          <p>Write articles for parents. Published posts appear at speechconnect.in/blog.</p>
        </div>
        <div className="blog-admin-actions">
          <button type="button" className="min-btn secondary sm" onClick={addStarterPosts}>
            Add starter articles
          </button>
          <button type="button" className="min-btn primary sm" onClick={() => setEditing({ ...EMPTY_POST })}>
            + New post
          </button>
        </div>
      </div>

      {loading && !posts.length ? (
        <p className="field-hint">Loading posts...</p>
      ) : !posts.length ? (
        <div className="min-card">
          <p>No posts yet. Click "Add starter articles" to add three draft articles to review, or write a new post.</p>
        </div>
      ) : (
        <div className="blog-admin-list">
          {posts.map((post) => (
            <div className="min-card blog-admin-row" key={post.id}>
              <div className="blog-admin-row-main">
                <span className={`pill-status ${post.published ? 'ok' : 'draft'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <strong>{post.title}</strong>
                <span className="field-hint">
                  {post.category || 'No category'} · Updated {formatDate(post.updatedAt)}
                  {post.published && ` · Published ${formatDate(post.publishedAt)}`}
                </span>
              </div>
              <div className="blog-admin-actions">
                {post.published && (
                  <a
                    className="min-btn ghost sm"
                    href={`${clientUrl}/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                )}
                <button type="button" className="min-btn secondary sm" onClick={() => editPost(post)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="icon-btn-danger"
                  onClick={() => deletePost(post)}
                  title="Delete post"
                  aria-label={`Delete ${post.title}`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
