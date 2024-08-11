const { validationResult, matchedData } = require('express-validator');
const { getAllPembayaran, findPembayaranByStatus, findPembayaranById, createPembayaran, updatePembayaran, deletePembayaran } = require('../services/pembayaran.service');
const { validateStatusQuery, createPembayaranSchema, updatePembayaranSchema } = require('../utils/validator/pembayaran.validator');

const router = require('express').Router();

router.get('/', validateStatusQuery, async (req, res) => {
  const { status } = req.query;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!status) {
    const result = await getAllPembayaran();

    return res.json({
      error: false,
      count: result.count,
      data: result.data
    });
  } else {
    const result = await findPembayaranByStatus(status);

    return res.json({
      error: false,
      count: result.length,
      data: result
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findPembayaranById(id);

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

router.post('/', createPembayaranSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await createPembayaran(cleanData);

    res.json({
      error: false,
      data: result.dataValues
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.patch('/:id', updatePembayaranSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await updatePembayaran(id, cleanData);

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
    const result = await deletePembayaran(id);

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