const express = require('express');
const sequelize = require('./database/sequelize-config');
const { userController, favoriteController, seriesFilmController, episodeMovieController, genreController, seriesFilmGenreController, paketController, orderController, pembayaranController, authController, uploadController } = require('./controllers');
const authMiddleware = require('./middlewares/auth.middleware');

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
app.use('/api/favorites', authMiddleware, favoriteController);
app.use('/api/series-film', seriesFilmController);
app.use('/api/episode-movie', episodeMovieController);
app.use('/api/genres', genreController);
app.use('/api/series-film-genres', seriesFilmGenreController);
app.use('/api/paket', paketController);
app.use('/api/orders', orderController);
app.use('/api/pembayaran', pembayaranController);
app.use('/api/auth', authController);
app.use('/api/upload', uploadController);

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

