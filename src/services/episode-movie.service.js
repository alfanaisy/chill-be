const EpisodeMovie = require("../models/episode-movie.model")

const getAllEpisodeMovies = async () => {
  const result = await EpisodeMovie.findAndCountAll();

  return {
    count: result.count,
    data: result.rows
  }
}

const findEpisodeMovieById = async (id) => {
  const result = await EpisodeMovie.findByPk(id);

  return result;
}

const createEpisodeMovie = async (item) => {
  const result = await EpisodeMovie.create(item);

  return result;
}

const updateEpisodeMovie = async (id, item) => {
  const existingItem = await findEpisodeMovieById(id);
  if (!existingItem) return null;

  const result = await EpisodeMovie.update(item, { where: { episodeMovieId: id }, returning: true });
  return result;
}

const deleteEpisodeMovie = async (id) => {
  const existingItem = await findEpisodeMovieById(id);
  if (!existingItem) return null;

  const result = await EpisodeMovie.destroy({ where: { episodeMovieId: id } });
  return result;
}

module.exports = {
  getAllEpisodeMovies,
  findEpisodeMovieById,
  createEpisodeMovie,
  updateEpisodeMovie,
  deleteEpisodeMovie
}