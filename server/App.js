const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(`Error Connecting to MongoDB.Error Code: ${err}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});

require("./model/user");
require("./model/post");
require("./model/item");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));
app.use(require("./routes/cart"));
