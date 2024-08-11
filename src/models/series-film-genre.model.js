const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize-config");
const SeriesFilm = require("./series-film.model");
const Genre = require("./genre.model");

const SeriesFilmGenre = sequelize.define("SeriesFilmGenre", {
  seriesFilmId: {
    type: DataTypes.INTEGER,
    references: {
      model: SeriesFilm,
      key: 'seriesFilmId'
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  genreId: {
    type: DataTypes.INTEGER,
    references: {
      model: Genre,
      key: 'genreId'
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

SeriesFilm.belongsToMany(Genre, { through: SeriesFilmGenre, foreignKey: 'seriesFilmId' });
Genre.belongsToMany(SeriesFilm, { through: SeriesFilmGenre, foreignKey: 'genreId' });

module.exports = SeriesFilmGenre;