const express = require('express');
const sequelize = require('./database/sequelize-config');

const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  console.log(req.url);

  res.json({
    message: "Hello World!"
  });
});

//nice callback hell
sequelize.authenticate()
  .then(() => {
    console.log("Database authentication successful.");
    sequelize.sync({ alter: true })
      .then(() => {
        console.log("Database synchronization successful.");
        app.listen(PORT, () => {
          console.log(`Server listening on http://localhost:${PORT}`);
        });
      })
      .catch(error => {
        console.log("Database synchronization failed: ", error);
      })
  })
  .catch(error => {
    console.log("Database authentication failed: ", error);
  })

