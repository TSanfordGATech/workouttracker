const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT} !`);
});