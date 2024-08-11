const { checkSchema } = require('express-validator');
const { findUserById } = require('../../services/user.service');
const { findPaketById } = require('../../services/paket.service');

const createOrderSchema = checkSchema({
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
  paketId: {
    in: ['body'],
    isInt: {
      errorMessage: 'Paket ID must be an integer',
    },
    notEmpty: {
      errorMessage: 'Paket ID is required',
    },
    custom: {
      options: async (value, { req }) => {
        const paketExists = await findPaketById(value);
        if (!paketExists) {
          return Promise.reject("Invalid Paket Id.");
        }
        return true;
      }
    }
  },
  orderDate: {
    in: ['body'],
    optional: true,
    isISO8601: {
      errorMessage: 'Order Date must be a valid date',
    },
    toDate: true,
  },
  orderStatus: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Order status is required',
    },
    isIn: {
      options: [['Pending', 'Completed', 'Cancelled']],
      errorMessage: 'Order status must be one of the following: Pending, Completed, Cancelled',
    },
  },
  totalAmount: {
    in: ['body'],
    isDecimal: {
      errorMessage: 'Total amount must be a decimal value',
    },
    notEmpty: {
      errorMessage: 'Total amount is required',
    },
  },
});

const updateOrderSchema = checkSchema({
  userId: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'User ID must be an integer',
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
  paketId: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Paket ID must be an integer',
    },
    custom: {
      options: async (value, { req }) => {
        const paketExists = await findPaketById(value);
        if (!paketExists) {
          return Promise.reject("Invalid Paket Id.");
        }
        return true;
      }
    }
  },
  orderDate: {
    in: ['body'],
    optional: true,
    isISO8601: {
      errorMessage: 'Order Date must be a valid date',
    },
    toDate: true,
  },
  orderStatus: {
    in: ['body'],
    optional: true,
    isIn: {
      options: [['Pending', 'Completed', 'Cancelled']],
      errorMessage: 'Order status must be one of the following: Pending, Completed, Cancelled',
    },
  },
  totalAmount: {
    in: ['body'],
    optional: true,
    isDecimal: {
      errorMessage: 'Total amount must be a decimal value',
    },
  },
});

module.exports = {
  createOrderSchema,
  updateOrderSchema
};
