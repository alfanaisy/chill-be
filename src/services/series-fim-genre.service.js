const Genre = require("../models/genre.model");
const SeriesFilmGenre = require("../models/series-film-genre.model");
const SeriesFilm = require("../models/series-film.model");

const addGenreToSeriesFilm = async (genreId, seriesFilmId) => {
  const result = SeriesFilmGenre.create({ seriesFilmId, genreId });

  return result;
}

const searchSeriesFilmsGenres = async (seriesFilmId) => {
  const result = await SeriesFilm.findByPk(seriesFilmId, {
    include: [
      {
        model: Genre,
        attributes: ['genreId', 'name'],
        through: {
          attributes: []
        }
      }
    ]
  });

  return result;
}

const searchGenresSeriesFilms = async (genreId) => {
  const result = await Genre.findByPk(genreId, {
    include: [
      {
        model: SeriesFilm,
        attributes: ['seriesFilmId', 'title'],
        through: {
          attributes: []
        }
      }
    ]
  });

  return result;
}

const removeGenreFromSeriesFilm = async (genreId, seriesFilmId) => {
  const existingItem = await SeriesFilmGenre.findOne({
    where: {
      genreId, seriesFilmId
    }
  });
  if (!existingItem) return null;

  const result = await SeriesFilmGenre.destroy({
    where: {
      genreId, seriesFilmId
    }
  });
  return result;
}

module.exports = {
  addGenreToSeriesFilm,
  searchSeriesFilmsGenres,
  searchGenresSeriesFilms,
  removeGenreFromSeriesFilm
}