const { Op } = require("sequelize");
const Genre = require("../models/genre.model")

const getAllGenres = async () => {
  const result = await Genre.findAndCountAll();

  return {
    count: result.count,
    data: result.rows
  }
}

const createGenre = async (item) => {
  const result = await Genre.create(item);

  return result;
}

const findGenreById = async (id) => {
  const result = await Genre.findByPk(id);

  return result;
}

const updateGenre = async (id, item) => {
  const existingItem = await findGenreById(id);
  if (!existingItem) return null;

  const result = await Genre.update(item, {
    where: {
      genreId: id
    },
    returning: true
  });
  return result;
}

const deleteGenre = async (id) => {
  const existingItem = await findGenreById(id);
  if (!existingItem) return null;

  const result = await Genre.destroy({
    where: {
      genreId: id
    }
  });
  return result;
}

const findGenreByName = async (name) => {
  const result = await Genre.findOne({
    where: {
      name
    }
  });

  return result;
}

const searchGenreByName = async (keyword) => {
  const result = await Genre.findOne({
    where: {
      name: {
        [Op.iLike]: `%${keyword}%` //case insensitive search - postgres only
      }
    }
  });

  return result;
}

module.exports = {
  getAllGenres,
  createGenre,
  findGenreById,
  updateGenre,
  deleteGenre,
  findGenreByName,
  searchGenreByName
}