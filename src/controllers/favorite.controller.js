const { validationResult, matchedData } = require('express-validator');
const {
  getFavorite,
  addToFavorite,
  removeFromFavorite
} = require('../services/favorite.service');
const { addFavoriteValidator } = require('../utils/validator/favorite.validator');

const router = require('express').Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const result = await getFavorite(userId);

  res.json({
    error: false,
    count: result.count,
    data: result.data
  });
});

router.post('/', addFavoriteValidator, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    const { data } = await getFavorite(cleanData.userId);

    const userFavItem = data.find(item => item.dataValues.seriesFilmId === Number(cleanData.itemId));

    if (userFavItem) return res.status(400).json({
      error: true,
      message: "Data already exists."
    });

    const result = await addToFavorite(cleanData.userId, cleanData.itemId);
    if (!result) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      data: result.dataValues
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.delete('/:userId', async (req, res) => {
  const { itemId } = req.query;
  const { userId } = req.params;

  try {
    const result = await removeFromFavorite(userId, itemId);
    if (!result) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      message: "Data deleted."
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

module.exports = router;