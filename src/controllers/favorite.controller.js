const { getFavorite } = require('../services/favorite.service');

const router = require('express').Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const result = await getFavorite(userId);

  res.json({
    error: false,
    count: result.count,
    data: result.data
  })
});


module.exports = router;