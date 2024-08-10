const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize-config");

const SeriesFilm = require("./series-film.model");
const User = require("./user.model");

const Favorite = sequelize.define("Favorites", {
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

User.belongsToMany(SeriesFilm, { through: Favorite, foreignKey: 'userId' });
SeriesFilm.belongsToMany(User, { through: Favorite, foreignKey: 'seriesFilmId' });

module.exports = Favorite;