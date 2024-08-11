const { checkSchema } = require('express-validator');

const createSeriesFilmGenreSchema = checkSchema({
  seriesFilmId: {
    in: ['body'],
    isInt: true,
    toInt: true,
    errorMessage: 'Series/Film ID must be a valid integer.',
    custom: {
      options: async (value, { req }) => {
        const SeriesFilm = require('../../models/series-film.model');
        const seriesFilm = await SeriesFilm.findByPk(value);
        if (!seriesFilm) {
          return Promise.reject('Series/Film with this Id does not exist.');
        }
        return true;
      }
    }
  },
  genreId: {
    in: ['body'],
    isInt: true,
    toInt: true,
    errorMessage: 'Genre ID must be a valid integer.',
    custom: {
      options: async (value, { req }) => {
        const Genre = require('../../models/genre.model');
        const genre = await Genre.findByPk(value);
        if (!genre) {
          return Promise.reject('Genre with this Id does not exist.');
        }
        return true;
      }
    }
  }
});

module.exports = { createSeriesFilmGenreSchema };
