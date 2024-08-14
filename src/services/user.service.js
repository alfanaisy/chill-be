const { hash, compare } = require("bcrypt");
const User = require("../models/user.model");
const { Op, where } = require("sequelize");

const findAllUsers = async () => {
  const result = await User.findAndCountAll();

  return {
    data: result.rows,
    count: result.count
  };
}

const findUserById = async (id) => {
  const result = await User.findByPk(id);

  return result;
}

const findUserByCondition = async (condition) => {
  const whereClause = {};

  if (condition.username) whereClause.username = condition.username;

  if (condition.email) whereClause.email = condition.email;

  const result = await User.findOne({
    where: {
      [Op.or]: whereClause
    }
  });

  return result;
}

const createUser = async (user) => {
  user.password = await hash(user.password, 10);

  const newUser = await User.create(user);

  return newUser;
}

const updateUser = async (id, user) => {
  const existingUser = await findUserById(id);

  if (!existingUser) return null;

  if (user.password) user.password = await hash(user.password, 10);

  const updateResult = await User.update(user, { where: { userId: id }, returning: true });

  return updateResult;
}

const deleteUser = async (id) => {
  const existingUser = await findUserById(id);

  if (!existingUser) return null;

  const deleteResult = await User.destroy({ where: { userId: id } });

  return deleteResult;
}

const findUserByToken = async (token) => {
  const result = await User.findOne({
    where: {
      verificationToken: token
    }
  });

  return result;
}

module.exports = {
  findAllUsers,
  findUserById,
  findUserByCondition,
  createUser,
  updateUser,
  deleteUser,
  findUserByToken
}