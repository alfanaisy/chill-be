const { checkSchema } = require("express-validator");

const createSeriesFilmSchema = checkSchema({
  title: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Title is required.',
    },
    isString: {
      errorMessage: 'Title must be a string.',
    },
  },
  description: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Description must be a string.',
    },
  },
  releaseDate: {
    in: ['body'],
    optional: true,
    isISO8601: {
      errorMessage: 'Release date must be a valid date.',
    },
  },
  imageUrl: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Image URL is required.',
    },
    isURL: {
      errorMessage: 'Image URL must be a valid URL.',
    },
  },
  type: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Type is required.',
    },
    isIn: {
      options: [['Series', 'Film']],
      errorMessage: 'Type must be either "Series" or "Film".',
    },
  },
});

const updateSeriesFilmSchema = checkSchema({
  title: {
    in: ['body'],
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Title must be a string.',
    },
  },
  description: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Description must be a string.',
    },
  },
  releaseDate: {
    in: ['body'],
    optional: true,
    isISO8601: {
      errorMessage: 'Release date must be a valid date.',
    },
  },
  imageUrl: {
    in: ['body'],
    optional: true,
    trim: true,
    isURL: {
      errorMessage: 'Image URL must be a valid URL.',
    },
  },
  type: {
    in: ['body'],
    optional: true,
    trim: true,
    isIn: {
      options: [['Series', 'Film']],
      errorMessage: 'Type must be either "Series" or "Film".',
    },
  },
});

const seriesFilmQuerySchema = checkSchema({
  orderBy: {
    optional: true,
    isIn: {
      options: [['title', 'releaseDate']],
      errorMessage: 'Invalid orderBy property. Please use either "title" or "releaseDate".'
    }
  },
  sortOrder: {
    optional: true,
    isIn: {
      options: [['ASC', 'DESC']],
      errorMessage: 'Invalid sortOrder. Please use either "ASC" or "DESC".'
    }
  },
  search: {
    optional: true,
    isString: true,
  },
  type: {
    optional: true,
    isIn: {
      options: [['Film', 'Series']],
      errorMessage: 'Invalid type. Please use either "Film" or "Series".'
    }
  }
}, ['query']);

module.exports = {
  createSeriesFilmSchema,
  updateSeriesFilmSchema,
  seriesFilmQuerySchema
}