const express = require('express')
const pasteController = require('../controller/pasteController')
const pastRouter = express.Router()


pastRouter.post("/pastes", pasteController.createPaste)

module.exports = pastRouter