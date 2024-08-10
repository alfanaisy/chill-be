const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize-config");
const SeriesFilm = require("./series-film.model");

const EpisodeMovie = sequelize.define("EpisodeMovie", {
  episodeMovieId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  releaseDate: {
    type: DataTypes.DATE,
  },
  seriesFilmId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SeriesFilm,
      key: 'seriesFilmId'
    }
  },
  episodeNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  seasonNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

SeriesFilm.hasMany(EpisodeMovie, { foreignKey: 'seriesFilmId', as: 'episodesMovies' });
EpisodeMovie.belongsTo(SeriesFilm, { foreignKey: 'seriesFilmId', as: 'seriesFilm' });

module.exports = EpisodeMovie;