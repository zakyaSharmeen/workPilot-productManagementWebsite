import multer from 'multer';
import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.js';
import asyncHandler from '../utils/asyncHandler.js';

// ── Multer — store file in memory, no disk writes ─────────────────────────────
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg, png, webp and gif images are allowed'), false);
  }
};

/**
 * upload — pre-configured multer instance.
 * Use as: upload.single('avatar') or upload.single('attachment')
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// ── Buffer → Readable stream (replaces the removed streamifier package) ────────
const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null); // signal end-of-stream
  return readable;
};

/**
 * uploadToCloudinary — streams req.file.buffer to Cloudinary.
 * Attaches req.cloudinaryResult = { secure_url, public_id } for the controller.
 *
 * @param {string} folder — Cloudinary folder name, e.g. 'avatars'
 */
export const uploadToCloudinary = (folder) =>
  asyncHandler(async (req, res, next) => {
    if (!req.file) return next(); // no file uploaded — controller will handle it

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      bufferToStream(req.file.buffer).pipe(uploadStream);
    });

    req.cloudinaryResult = result;
    next();
  });
