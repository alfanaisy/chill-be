const { JsonWebTokenError } = require("jsonwebtoken");
const { verifyToken } = require("../utils/helper/jwt-helper");

const authMiddleware = async (req, res, next) => {
  const token = req.get('authorization').split(' ')[1];

  if (!token) return res.status(403).json({
    error: true,
    message: "Token not found."
  });

  try {
    const decoded = await verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.log();
      return res.status(403).json({
        error: true,
        message: error.message
      });
    }

    return res.status(500).json({
      error: true,
      message: "Internal server error."
    });
  }
}

module.exports = authMiddleware;