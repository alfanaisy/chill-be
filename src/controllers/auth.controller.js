const { validationResult, matchedData } = require('express-validator');
const { loginValidator, registerValidator } = require('../utils/validator/auth.validator');
const { findUserByCondition, createUser } = require('../services/user.service');
const { compare } = require('bcrypt');
const { generateToken } = require('../utils/helper/jwt-helper');
const omitPassword = require('../utils/helper/omit-password');

const router = require('express').Router();

router.post('/login', loginValidator, async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = matchedData(req);

  if (!errors.isEmpty()) return res.status(400).json({
    errors: errors.array()
  });

  try {
    const user = await findUserByCondition({ email });

    if (!user) return res.status(401).json({
      error: true,
      message: "Invalid credentials."
    });

    const passwordMatch = await compare(password, user.password);
    console.log("reach", passwordMatch, password);
    if (!passwordMatch) return res.status(401).json({
      error: true,
      message: "Invalid credentials."
    });

    const token = await generateToken({
      id: user.userId,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      subscriptionStatus: user.subscriptionStatus
    });

    res.json({
      error: false,
      message: "Login successful.",
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.post('/register', registerValidator, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) return res.status(400).json({
    errors: errors.array()
  });

  try {
    const { dataValues } = await createUser(cleanData);

    const token = await generateToken({
      id: dataValues.userId,
      username: dataValues.username,
      email: dataValues.email,
      fullName: dataValues.fullName,
      subscriptionStatus: dataValues.subscriptionStatus
    });

    res.json({
      error: true,
      data: omitPassword(dataValues),
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

module.exports = router;