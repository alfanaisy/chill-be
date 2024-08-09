const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  console.log(req.url);

  res.json({
    message: "Hello World!"
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});