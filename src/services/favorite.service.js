const Favorite = require('../models/relation/favorite.relation');
const { findSeriesFilmById } = require('./series-film.service');
const { findUserById } = require('./user.service');

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

const addToFavorite = async (userId, seriesFilmId) => {
  const user = await findUserById(userId);
  if (!user) return null;

  const item = await findSeriesFilmById(seriesFilmId);
  if (!item) return null;

  const result = await Favorite.create({ userId, seriesFilmId });
  return result;
}

const removeFromFavorite = async (userId, seriesFilmId) => {
  const itemToDelete = await Favorite.findOne({
    where: {
      userId,
      seriesFilmId
    }
  });
  if (!itemToDelete) return null;

  const result = await Favorite.destroy({
    where: {
      userId,
      seriesFilmId
    }
  });

  return result;
}

module.exports = {
  getFavorite,
  addToFavorite,
  removeFromFavorite
}