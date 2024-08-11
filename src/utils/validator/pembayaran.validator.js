const { checkSchema } = require('express-validator');
const { findUserById } = require('../../services/user.service');
const { findOrderById } = require('../../services/order.service');

const createPembayaranSchema = checkSchema({
  userId: {
    in: ['body'],
    isInt: {
      errorMessage: 'UserID must be an integer',
    },
    notEmpty: {
      errorMessage: 'UserID is required',
    },
    custom: {
      options: async (value, { req }) => {
        const userExists = await findUserById(value);
        if (!userExists) return Promise.reject("Invalid User id.");
        return true;
      }
    }
  },
  orderId: {
    in: ['body'],
    isInt: {
      errorMessage: 'OrderID must be an integer',
    },
    notEmpty: {
      errorMessage: 'OrderID is required',
    },
    custom: {
      options: async (value, { req }) => {
        const userExists = await findOrderById(value);
        if (!userExists) return Promise.reject("Invalid Order id.");
        return true;
      }
    }
  },
  amount: {
    in: ['body'],
    isDecimal: {
      errorMessage: 'Amount must be a decimal value',
    },
    notEmpty: {
      errorMessage: 'Amount is required',
    },
  },
  paymentMethod: {
    in: ['body'],
    isString: {
      errorMessage: 'PaymentMethod must be a string',
    },
    notEmpty: {
      errorMessage: 'PaymentMethod is required',
    },
  },
  paymentStatus: {
    in: ['body'],
    isIn: {
      options: [['Pending', 'Completed', 'Failed']],
      errorMessage: 'PaymentStatus must be one of Pending, Completed, or Failed',
    },
    notEmpty: {
      errorMessage: 'PaymentStatus is required',
    },
  },
});

const updatePembayaranSchema = checkSchema({
  userId: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'UserID must be an integer',
    },
    custom: {
      options: async (value, { req }) => {
        const userExists = await findUserById(value);
        if (!userExists) return Promise.reject("Invalid User id.");
        return true;
      }
    }
  },
  orderId: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'OrderID must be an integer',
    },
    custom: {
      options: async (value, { req }) => {
        const userExists = await findOrderById(value);
        if (!userExists) return Promise.reject("Invalid Order id.");
        return true;
      }
    }
  },
  amount: {
    in: ['body'],
    optional: true,
    isDecimal: {
      errorMessage: 'Amount must be a decimal value',
    },
  },
  paymentMethod: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'PaymentMethod must be a string',
    },
  },
  paymentStatus: {
    in: ['body'],
    optional: true,
    isIn: {
      options: [['Pending', 'Completed', 'Failed']],
      errorMessage: 'PaymentStatus must be one of Pending, Completed, or Failed',
    },
  },
});

const validateStatusQuery = checkSchema({
  status: {
    in: ['query'],
    optional: true,
    custom: {
      options: (value) => ['Pending', 'Completed', 'Failed'].includes(value),
      errorMessage: 'Status must be one of: Pending, Completed, Failed',
    },
  },
});


module.exports = {
  createPembayaranSchema,
  updatePembayaranSchema,
  validateStatusQuery
};