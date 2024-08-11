const { validationResult, matchedData } = require('express-validator');
const { getAllOrders, findOrderById, createOrder, updateOrder, deleteOrder } = require('../services/order.service');
const { createOrderSchema, updateOrderSchema } = require('../utils/validator/order.validator');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const result = await getAllOrders();

  res.json({
    error: false,
    count: result.count,
    data: result.data
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findOrderById(id);

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

router.post('/', createOrderSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await createOrder(cleanData);

    res.json({
      error: false,
      message: "Data created.",
      data: result.dataValues
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.patch('/:id', updateOrderSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await updateOrder(id, cleanData);

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
    const result = await deleteOrder(id);

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