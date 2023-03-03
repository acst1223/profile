const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// middleware
const STATIC_DIRNAME = "public";
app.use(express.static(STATIC_DIRNAME));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/${STATIC_DIRNAME}/index.html`);
});

app.get("/photo", (req, res) => {
  res.sendFile(`${__dirname}/${STATIC_DIRNAME}/photo.html`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
