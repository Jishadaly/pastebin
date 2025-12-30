const Paste = require('../model/pasteModel');
const AppError = require('../utils/');
const asyncHandler = require('../utils/asyncHnadler');

const createPaste = asyncHandler(async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== 'string' || !content.trim()) {
    throw new AppError('Invalid content', 400);
  }

  if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    throw new AppError('Invalid ttl_seconds', 400);
  }

  if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
    throw new AppError('Invalid max_views', 400);
  }

  const expiresAt = ttl_seconds
    ? new Date(Date.now() + ttl_seconds * 1000)
    : null;

  const paste = await Paste.create({
    content,
    expiresAt,
    maxViews: max_views ?? null,
  });

  res.status(201).json({
    id: paste._id.toString(),
    url: `${process.env.BASE_URL}/p/${paste._id}`,
  });
});

module.exports = { createPaste };
