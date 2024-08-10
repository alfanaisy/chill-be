const SeriesFilm = require("../models/series-film.model")

const getAllSeriesFilm = async () => {
  const result = await SeriesFilm.findAndCountAll();

  return {
    count: result.count,
    data: result.rows
  }
}

const createSeriesFilm = async (item) => {
  const result = await SeriesFilm.create(item);

  return result;
}

const updateSeriesFilm = async (id, item) => {
  const existingItem = await SeriesFilm.findByPk(id);
  if (!existingItem) return null;

  const updatedItem = await SeriesFilm.update(item, { where: { seriesFilmId: id }, returning: true });
  return updatedItem;
}

const findSeriesFilmById = async (id) => {
  const result = await SeriesFilm.findByPk(id);

  return result;
}

const deleteSeriesFilm = async (id) => {
  const existingItem = await findSeriesFilmById(id);
  if (!existingItem) return null;


  const result = await SeriesFilm.destroy({ where: { seriesFilmId: id } });
  return result;
}


module.exports = {
  getAllSeriesFilm,
  createSeriesFilm,
  updateSeriesFilm,
  findSeriesFilmById,
  deleteSeriesFilm
}