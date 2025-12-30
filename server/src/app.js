const express = require("express");
const cors = require("cors");
const pastesRoutes = require("./routes/pasteRoute");
const errorHandler = require("./middleware.js/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.use("/api", pastesRoutes);

app.use(errorHandler)

module.exports = app;
