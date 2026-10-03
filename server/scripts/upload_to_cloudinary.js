import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.replace(/^["']|["']$/g, '').trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.replace(/^["']|["']$/g, '').trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.replace(/^["']|["']$/g, '').trim();
let mongoUri = process.env.MONGODB_URI?.replace(/^["']|["']$/g, '').trim();

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Error: Cloudinary credentials missing in server/.env');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

async function main() {
  console.log(`Connecting to Cloudinary with cloud_name: ${cloudName}...`);

  // Test ping to Cloudinary
  try {
    const pingRes = await cloudinary.api.ping();
    console.log('Cloudinary ping successful:', pingRes);
  } catch (err) {
    console.error('Cloudinary ping failed:', err);
    process.exit(1);
  }

  const imagesDir = path.join(__dirname, '..', '..', 'client', 'public', 'images');
  const files = [
    { key: 'logo', filename: 'logo.jpeg' },
    { key: 'hero1', filename: 'najiya-pm.jpg' },
    { key: 'hero2', filename: 'najiya-pm-2.jpg' },
    { key: 'about', filename: 'najiya-pm-about.jpg' },
    { key: 'brownBg', filename: 'najiya-pm-brown-bg.jpg' },
  ];

  const uploadedUrls = {};

  for (const item of files) {
    const filePath = path.join(imagesDir, item.filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    console.log(`Uploading ${item.filename} to Cloudinary...`);
    const publicId = `speech_connect/${path.basename(item.filename, path.extname(item.filename))}`;
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    });

    console.log(`Uploaded ${item.filename} -> ${result.secure_url}`);
    uploadedUrls[item.key] = result.secure_url;
  }

  console.log('\n--- All Uploaded Cloudinary URLs ---');
  console.log(JSON.stringify(uploadedUrls, null, 2));

  // Connect to MongoDB and update SiteContent
  if (mongoUri) {
    try {
      console.log('\nConnecting to MongoDB to update saved site content with Cloudinary URLs...');
      await mongoose.connect(mongoUri);
      const siteContentSchema = new mongoose.Schema({
        key: { type: String, default: 'main_content', unique: true },
        content: { type: mongoose.Schema.Types.Mixed },
      });
      const SiteContent = mongoose.model('SiteContent', siteContentSchema);

      const doc = await SiteContent.findOne({ key: 'main_content' });
      if (doc && doc.content) {
        const c = doc.content;
        if (c.therapist) {
          if (uploadedUrls.hero1) c.therapist.photo = uploadedUrls.hero1;
          if (uploadedUrls.about) c.therapist.aboutPhoto = uploadedUrls.about;
        }
        if (c.hero) {
          c.hero.photos = [uploadedUrls.hero1, uploadedUrls.hero2].filter(Boolean);
        }
        doc.content = c;
        doc.markModified('content');
        await doc.save();
        console.log('Successfully updated MongoDB SiteContent document with Cloudinary URLs!');
      } else {
        console.log('No existing main_content document found in MongoDB to update.');
      }
      await mongoose.disconnect();
    } catch (dbErr) {
      console.error('MongoDB update error:', dbErr);
    }
  }

  console.log('\nMigration to Cloudinary finished successfully!');
}

main().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
