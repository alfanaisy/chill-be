const { checkSchema } = require("express-validator");
const { findUserById } = require("../../services/user.service");
const { findSeriesFilmById } = require("../../services/series-film.service");

const addFavoriteValidator = checkSchema({
  userId: {
    in: ['body'],
    isInt: {
      errorMessage: 'User ID must be an integer',
    },
    notEmpty: {
      errorMessage: 'User ID is required',
    },
    custom: {
      options: async (value, { req }) => {
        const userExists = await findUserById(value);
        if (!userExists) {
          return Promise.reject("Invalid User Id.");
        }
        return true;
      }
    }
  },
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
  addFavoriteValidator
}