const express = require('express');
const sequelize = require('./database/sequelize-config');
const { userController } = require('./controllers');

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.url);

  res.json({
    message: "Hello World!"
  });
});

app.use('/api/users', userController);

//nice callback hell
sequelize.authenticate()
  .then(() => {
    console.log("Database authentication successful.");
    sequelize.sync()
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

