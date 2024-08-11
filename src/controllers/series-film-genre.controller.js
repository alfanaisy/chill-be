const { validationResult, matchedData } = require('express-validator');
const { searchGenresSeriesFilms, searchSeriesFilmsGenres, addGenreToSeriesFilm, removeGenreFromSeriesFilm } = require('../services/series-fim-genre.service');
const { createSeriesFilmGenreSchema } = require('../utils/validator/series-film-genre.validator');
const { findSeriesFilmById } = require('../services/series-film.service');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const { genreId, itemId } = req.query;

  if (genreId && itemId) return res.status(400).json({
    error: true,
    message: "Please only search for one condition. Either Genre or Series/Film."
  });

  if (genreId) {
    const result = await searchGenresSeriesFilms(genreId);
    if (!result) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      data: result.dataValues
    });
  } else if (itemId) {
    const result = await searchSeriesFilmsGenres(itemId);
    if (!result) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      data: result.dataValues
    });
  }
});

router.post('/', createSeriesFilmGenreSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const result = await addGenreToSeriesFilm(cleanData.genreId, cleanData.seriesFilmId);

    res.json({
      error: false,
      data: result.dataValues
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.delete('/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { genreId } = req.query;

  try {
    const item = await findSeriesFilmById(itemId);
    if (!item) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    const result = await removeGenreFromSeriesFilm(genreId, itemId);
    if (!result) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      message: "Data deleted."
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
})

module.exports = router;