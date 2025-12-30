const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
