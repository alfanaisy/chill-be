const DaftarSaya = require("./daftar-saya.model");
const SeriesFilm = require("./series-film.model");

DaftarSaya.belongsToMany(SeriesFilm, { through: "Favorites", foreignKey: "userId" });
SeriesFilm.belongsToMany(DaftarSaya, { through: "Favorites", foreignKey: "seriesFilmId" });