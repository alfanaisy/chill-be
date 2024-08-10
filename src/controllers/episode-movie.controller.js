const { validationResult, matchedData } = require('express-validator');
const {
  getAllEpisodeMovies,
  findEpisodeMovieById,
  createEpisodeMovie,
  updateEpisodeMovie,
  deleteEpisodeMovie
} = require('../services/episode-movie.service');
const { createEpisodeMovieSchema, updateEpisodeMovieSchema } = require('../utils/validator/episode-movie.validator');
const { findSeriesFilmById } = require('../services/series-film.service');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const result = await getAllEpisodeMovies();

  res.json({
    error: false,
    count: result.count,
    data: result.data
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findEpisodeMovieById(id);
    if (!result) return res.json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      data: result.dataValues
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.post('/', createEpisodeMovieSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const seriesFilm = await findSeriesFilmById(cleanData.seriesFilmId);
    if (!seriesFilm) return res.status(400).json({
      error: true,
      message: "Data reference not found."
    });

    const result = await createEpisodeMovie(cleanData);

    res.json({
      error: false,
      data: result.dataValues
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.patch('/:id', updateEpisodeMovieSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (cleanData.seriesFilmId) {
      const seriesFilm = await findSeriesFilmById(cleanData.seriesFilmId);
      if (!seriesFilm) return res.status(400).json({
        error: true,
        message: "Data reference not found."
      });
    }

    const result = await updateEpisodeMovie(id, cleanData);
    if (!result) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      message: "Data updated.",
      data: result[1][0]
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteEpisodeMovie(id);

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