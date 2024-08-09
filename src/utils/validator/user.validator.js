const { checkSchema } = require("express-validator");

const createUserSchema = checkSchema({
  username: {
    notEmpty: {
      errorMessage: 'Username is required'
    },
    isString: true,
    isLength: {
      options: { min: 3 },
      errorMessage: 'Username must be at least 3 characters long'
    }
  },
  password: {
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
    notEmpty: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Must be a valid email'
    }
  },
  fullName: {
    optional: true,
    isString: true,
  },
  dateOfBirth: {
    optional: true,
    isDate: {
      errorMessage: 'Date of Birth must be a valid date'
    }
  },
  subscriptionStatus: {
    optional: true,
    isIn: {
      options: [['Free', 'Basic', 'Premium']],
      errorMessage: 'Subscription Status must be one of Free, Basic, or Premium'
    }
  }
});

const updateUserSchema = checkSchema({
  username: {
    optional: true,
    isString: true,
    isLength: {
      options: { min: 3 },
      errorMessage: 'Username must be at least 3 characters long'
    },
    errorMessage: 'Username must be a valid string'
  },
  password: {
    optional: true,
    isString: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long'
    },
    errorMessage: 'Password must be a valid string'
  },
  email: {
    optional: true,
    isEmail: {
      errorMessage: 'Must be a valid email'
    },
    errorMessage: 'Email must be a valid email address'
  },
  fullName: {
    optional: true,
    isString: true,
    errorMessage: 'Full Name must be a valid string'
  },
  dateOfBirth: {
    optional: true,
    isDate: {
      errorMessage: 'Date of Birth must be a valid date'
    }
  },
  subscriptionStatus: {
    optional: true,
    isIn: {
      options: [['Free', 'Basic', 'Premium']],
      errorMessage: 'Subscription Status must be one of Free, Basic, or Premium'
    }
  }
});

module.exports = {
  createUserSchema,
  updateUserSchema
};