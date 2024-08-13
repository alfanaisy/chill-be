const { checkSchema } = require("express-validator");
const { findUserByCondition } = require("../../services/user.service");

const loginValidator = checkSchema({
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Must be a valid email'
    },
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isString: true
  },
});

const registerValidator = checkSchema({
  fullName: {
    in: ['body'],
    isString: true,
  },
  username: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Username is required'
    },
    isString: true,
    isLength: {
      options: { min: 3 },
      errorMessage: 'Username must be at least 3 characters long'
    },
    custom: {
      options: async (value, { req }) => {
        const usernameExists = await findUserByCondition({ username: value });
        if (usernameExists) return Promise.reject("Username already in-use.");
        return true;
      }
    }
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isString: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long'
    }
  },
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Must be a valid email'
    },
    custom: {
      options: async (value, { req }) => {
        const emailExists = await findUserByCondition({ email: value });
        if (emailExists) return Promise.reject("Email already in-use.");
        return true;
      }
    }
  },
});

module.exports = {
  loginValidator,
  registerValidator
}