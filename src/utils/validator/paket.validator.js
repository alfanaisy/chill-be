const { checkSchema } = require('express-validator');
const Paket = require('../../models/paket.model');

const createPaketSchema = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    trim: true,
    notEmpty: {
      errorMessage: 'Name is required'
    },
    custom: {
      options: async (value, { req }) => {
        const paketExists = await Paket.findOne({ where: { name: value } });
        if (paketExists) {
          return Promise.reject('Name must be unique');
        }
        return true;
      }
    }
  },
  description: {
    in: ['body'],
    isString: true,
    optional: true,
    trim: true
  },
  price: {
    in: ['body'],
    isDecimal: {
      errorMessage: 'Price must be a valid decimal number'
    },
    notEmpty: {
      errorMessage: 'Price is required'
    }
  },
  durationInDays: {
    in: ['body'],
    isInt: {
      errorMessage: 'Duration in days must be an integer'
    },
    notEmpty: {
      errorMessage: 'Duration in days is required'
    }
  }
});

const updatePaketSchema = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    optional: true,
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const paketExists = await Paket.findOne({ where: { name: value } });
        if (paketExists) {
          throw new Error('Name must be unique');
        }
        return true;
      }
    }
  },
  description: {
    in: ['body'],
    isString: true,
    optional: true,
    trim: true
  },
  price: {
    in: ['body'],
    isDecimal: {
      errorMessage: 'Price must be a valid decimal number'
    },
    optional: true
  },
  durationInDays: {
    in: ['body'],
    isInt: {
      errorMessage: 'Duration in days must be an integer'
    },
    optional: true
  }
});



module.exports = {
  createPaketSchema,
  updatePaketSchema
}