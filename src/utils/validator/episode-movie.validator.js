const { checkSchema } = require("express-validator");

const createEpisodeMovieSchema = checkSchema({
  title: {
    in: ['body'],
    isString: {
      errorMessage: 'Title must be a string'
    },
    notEmpty: {
      errorMessage: 'Title is required'
    },
    trim: true
  },
  description: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Description must be a string'
    },
    trim: true
  },
  duration: {
    in: ['body'],
    isInt: {
      errorMessage: 'Duration must be an integer'
    },
    toInt: true,
    notEmpty: {
      errorMessage: 'Duration is required'
    }
  },
  releaseDate: {
    in: ['body'],
    optional: true,
    isISO8601: {
      errorMessage: 'Release date must be a valid date'
    },
    toDate: true
  },
  seriesFilmId: {
    in: ['body'],
    isInt: {
      errorMessage: 'SeriesFilmId must be an integer'
    },
    toInt: true,
    notEmpty: {
      errorMessage: 'SeriesFilmId is required'
    }
  },
  episodeNumber: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'EpisodeNumber must be an integer'
    },
    toInt: true
  },
  seasonNumber: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'SeasonNumber must be an integer'
    },
    toInt: true
  }
});

const updateEpisodeMovieSchema = checkSchema({
  title: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Title must be a string'
    },
    trim: true
  },
  description: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Description must be a string'
    },
    trim: true
  },
  duration: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Duration must be an integer'
    },
    toInt: true
  },
  releaseDate: {
    in: ['body'],
    optional: true,
    isISO8601: {
      errorMessage: 'Release date must be a valid date'
    },
    toDate: true
  },
  seriesFilmId: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'SeriesFilmId must be an integer'
    },
    toInt: true
  },
  episodeNumber: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'EpisodeNumber must be an integer'
    },
    toInt: true
  },
  seasonNumber: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'SeasonNumber must be an integer'
    },
    toInt: true
  }
});



module.exports = { createEpisodeMovieSchema, updateEpisodeMovieSchema };