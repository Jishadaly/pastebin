const express = require("express");
const pastesRoutes = require("./routes/pasteRoute");
const errorHandler = require("./middleware.js/errorHandler");
const cors = require('cors')

const app = express();

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.use("/api", pastesRoutes);

app.use(errorHandler)

module.exports = app;
