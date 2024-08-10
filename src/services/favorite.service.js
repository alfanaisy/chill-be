const Favorite = require('../models/relation/favorite.relation');

const getFavorite = async (userId) => {
  const result = await Favorite.findAndCountAll({
    where: {
      userId
    }
  });

  return {
    count: result.count,
    data: result.rows
  }
}

const addToFavorite = async (userId, itemId) => {
  const result = await Favorite.create({ userId, itemId });

  return result;
}

module.exports = {
  getFavorite
}