const Paste = require('../model/pasteModel');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { getNow } = require('../utils/time');


const createPaste = asyncHandler(async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== 'string' || !content.trim())
    throw new AppError('Invalid content', 400);

  if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1))
    throw new AppError('Invalid ttl_seconds', 400);

  if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1))
    throw new AppError('Invalid max_views', 400);

  const expiresAt = ttl_seconds ? new Date(getNow(req) + ttl_seconds * 1000) : null;

  const paste = await Paste.create({
    content: content.trim(),
    expiresAt,
    maxViews: max_views ?? null
  });

  res.status(201).json({
    id: paste._id.toString(),
    url: `${process.env.BASE_URL}/api/p/${paste._id}`
  });
});


const getPaste = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const now = new Date(getNow(req));

  const paste = await Paste.findById(id);
  if (!paste) throw new AppError('Paste not found', 404);


  if (paste.expiresAt && paste.expiresAt <= now) {
    return res.status(404).json({ error: 'Paste expired' });
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return res.status(404).json({ error: 'Paste view limit exceeded' });
  }

  paste.views += 1;
  await paste.save();

  res.status(200).json({
    content: paste.content,
    remaining_views: paste.maxViews !== null ? paste.maxViews - paste.views : null,
    expires_at: paste.expiresAt
  });
});


const viewPaste = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const now = new Date(getNow(req));

  const paste = await Paste.findById(id);
  if (!paste) return res.status(404).send('<h1>Paste Not Found</h1>');

  if (paste.expiresAt && paste.expiresAt <= now)
    return res.status(404).send('<h1>Paste Expired</h1>');

  if (paste.maxViews !== null && paste.views >= paste.maxViews)
    return res.status(404).send('<h1>Paste View Limit Exceeded</h1>');

  paste.views += 1;
  await paste.save();

  res.send(`<pre>${paste.content}</pre>`);
});


const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json({ ok: true });
});

module.exports = {
  createPaste,
  getPaste,
  viewPaste,
  healthCheck
};
