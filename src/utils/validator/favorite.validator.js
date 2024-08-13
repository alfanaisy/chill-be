const { checkSchema } = require("express-validator");
const { findSeriesFilmById } = require("../../services/series-film.service");

const addFavoriteValidator = checkSchema({
  itemId: {
    in: ['body'],
    isInt: {
      errorMessage: 'SeriesFilmId must be an integer'
    },
    toInt: true,
    notEmpty: {
      errorMessage: 'SeriesFilmId is required'
    },
    custom: {
      options: async (value, { req }) => {
        const itemExists = await findSeriesFilmById(value);
        if (!itemExists) return Promise.reject("Invalid Series/Film Id.");
        return true;
      }
    }
  }
});

module.exports = {
  addFavoriteValidator,
}