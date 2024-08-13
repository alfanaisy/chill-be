const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  })
}

const generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SECRET_KEY,
      { expiresIn: '1d', issuer: 'chill-be' },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  })
}

module.exports = {
  verifyToken,
  generateToken
}