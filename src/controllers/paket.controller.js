const { validationResult, matchedData } = require('express-validator');
const { getAllPaket, createPaket, findPaketById, updatePaket, deletePaket } = require('../services/paket.service');
const { createPaketSchema, updatePaketSchema } = require('../utils/validator/paket.validator');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const result = await getAllPaket();

  res.json({
    error: false,
    count: result.count,
    data: result.data
  });
});

router.post('/', createPaketSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await createPaket(cleanData);

    res.json({
      error: false,
      message: "Data created.",
      data: result.dataValues
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findPaketById(id);

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

router.patch('/:id', updatePaketSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await updatePaket(id, cleanData);

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
    const result = await deletePaket(id);

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