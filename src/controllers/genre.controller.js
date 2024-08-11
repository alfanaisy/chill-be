const { validationResult, matchedData } = require('express-validator');
const { getAllGenres, findGenreByName, createGenre, searchGenreByName, findGenreById, updateGenre, deleteGenre } = require('../services/genre.service');
const { createGenreSchema, updateGenreSchema } = require('../utils/validator/genre.validator');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    const result = await getAllGenres();

    res.json({
      error: false,
      count: result.count,
      data: result.data
    });
  } else {
    const result = await searchGenreByName(name);

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

router.post('/', createGenreSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const genre = await findGenreByName(cleanData.name);
    if (genre) return res.status(400).json({
      error: true,
      message: "Data already exists."
    });

    const result = await createGenre(cleanData);
    res.json({
      error: false,
      data: result.dataValues
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findGenreById(id);

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

router.patch('/:id', updateGenreSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await updateGenre(id, cleanData);

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
    const result = await deleteGenre(id);

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
});

module.exports = router;