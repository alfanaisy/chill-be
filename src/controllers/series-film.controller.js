const { validationResult, matchedData } = require('express-validator');
const {
  getAllSeriesFilm,
  createSeriesFilm,
  updateSeriesFilm,
  findSeriesFilmById,
  deleteSeriesFilm
} = require('../services/series-film.service');
const { createSeriesFilmSchema, updateSeriesFilmSchema } = require('../utils/validator/series-film.validator');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const result = await getAllSeriesFilm();

  res.json({
    error: false,
    count: result.count,
    data: result.data
  });
});

router.post('/', createSeriesFilmSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await createSeriesFilm(cleanData);

    res.json({
      error: false,
      data: result.dataValues
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findSeriesFilmById(id);

    if (!result) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.patch('/:id', updateSeriesFilmSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await updateSeriesFilm(id, cleanData);

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
    const result = await deleteSeriesFilm(id);

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