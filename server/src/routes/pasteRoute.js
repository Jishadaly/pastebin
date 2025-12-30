const express = require('express');
const router = express.Router();
const { createPaste, getPaste, viewPaste, healthCheck
} = require('../controller/pasteController');

router.get('/healthz', healthCheck);
router.post('/pastes', createPaste);
router.get('/pastes/:id', getPaste);
router.get('/p/:id', viewPaste);

module.exports = router;
