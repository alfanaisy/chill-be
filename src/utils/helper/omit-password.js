const omitPassword = (userWithPassword) => {
  const { password, ...user } = userWithPassword.dataValues;

  return user;
}

module.exports = omitPassword;