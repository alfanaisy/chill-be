const userController = require('./user.controller');
const favoriteController = require('./favorite.controller');
const seriesFilmController = require('./series-film.controller');
const episodeMovieController = require('./episode-movie.controller');
const genreController = require('./genre.controller');
const seriesFilmGenreController = require('./series-film-genre.controller');
const paketController = require('./paket.controller');
const orderController = require('./order.controller');
const pembayaranController = require('./pembayaran.controller');

module.exports = {
  userController,
  favoriteController,
  seriesFilmController,
  episodeMovieController,
  genreController,
  seriesFilmGenreController,
  paketController,
  orderController,
  pembayaranController
}