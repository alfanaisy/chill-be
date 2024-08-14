const { Op } = require("sequelize");
const SeriesFilm = require("../models/series-film.model")

const getSeriesFilmByFilter = async (filter, orderBy, sortOrder) => {
  const whereClause = {};

  if (filter.search) {
    whereClause.title = { [Op.iLike]: `%${filter.search}%` };
  }
  if (filter.type) {
    whereClause.type = filter.type;
  }

  const orderClause = [];
  if (orderBy && sortOrder) {
    orderClause.push([orderBy, sortOrder]);
  }

  const result = await SeriesFilm.findAndCountAll({
    where: whereClause,
    order: orderClause,
  });

  return {
    count: result.count,
    data: result.rows,
  };
};

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
  getSeriesFilmByFilter,
  createSeriesFilm,
  updateSeriesFilm,
  findSeriesFilmById,
  deleteSeriesFilm,
}