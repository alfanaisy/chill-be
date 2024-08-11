const { checkSchema } = require('express-validator');

const createGenreSchema = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    notEmpty: {
      errorMessage: 'Name is required'
    },
    trim: true,
    escape: true,
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: 'Name must be between 3 and 255 characters'
    }
  },
  description: {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    escape: true,
    isLength: {
      options: { max: 500 },
      errorMessage: 'Description must be less than 500 characters'
    }
  }
});

const updateGenreSchema = checkSchema({
  name: {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    escape: true,
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: 'Name must be between 3 and 255 characters'
    }
  },
  description: {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    escape: true,
    isLength: {
      options: { max: 500 },
      errorMessage: 'Description must be less than 500 characters'
    }
  }
});

module.exports = {
  createGenreSchema,
  updateGenreSchema
};
