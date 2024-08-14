const { validationResult, matchedData, checkSchema } = require('express-validator');
const { loginValidator, registerValidator } = require('../utils/validator/auth.validator');
const { findUserByCondition, createUser, findUserByToken, updateUser } = require('../services/user.service');
const { compare } = require('bcrypt');
const { generateToken } = require('../utils/helper/jwt-helper');
const omitPassword = require('../utils/helper/omit-password');
const { v4: uuidv4 } = require('uuid');
const { sendVerificationEmail } = require('../utils/mailer/mail');

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
    const verificationToken = uuidv4();

    const result = await createUser({ ...cleanData, verificationToken });

    await sendVerificationEmail(result.dataValues.verificationToken);

    const token = await generateToken({
      id: result.dataValues.userId,
      username: result.dataValues.username,
      email: result.dataValues.email,
      fullName: result.dataValues.fullName,
      subscriptionStatus: result.dataValues.subscriptionStatus
    });

    res.json({
      error: true,
      data: omitPassword(result),
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.get('/verify-email', checkSchema({ token: { isString: true } }, ['query']), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({
    errors: errors.array()
  });

  const { token } = matchedData(req);

  try {
    const user = await findUserByToken(token);
    if (!user) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    const result = await updateUser(user.userId, { isVerified: true });
    if (result[0] === 0)
      return res.status(500).json({
        error: true,
        message: "Update failed."
      });

    res.json({
      error: false,
      message: "User verified."
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
})

module.exports = router;