const { validationResult, matchedData } = require('express-validator');
const {
  findAllUsers,
  createUser,
  findUserById,
  findUserByCondition,
  updateUser,
  deleteUser
} = require('../services/user.service');
const { createUserSchema, updateUserSchema } = require('../utils/validator/user.validator');
const omitPassword = require('../utils/helper/omit-password');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const { username, email } = req.query;

  if (!username && !email) {
    const data = await findAllUsers();

    const users = data.data.map(user => omitPassword(user));

    res.json({
      error: false,
      count: data.count,
      data: users
    });
  } else {
    const data = await findUserByCondition({ username, email });

    if (!data) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      data: omitPassword(data)
    });
  }

});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findUserById(id);

    if (!result) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      data: omitPassword(result)
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error. " });
  }
});

router.post('/', createUserSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await findUserByCondition({ username: cleanData.username, email: cleanData.email });

    if (user) return res.status(400).json({
      error: true,
      message: "Data already exists."
    });

    const result = await createUser(cleanData);

    res.json({
      error: false,
      message: "Data created.",
      data: omitPassword(result)
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.patch('/:id', updateUserSchema, async (req, res) => {
  const errors = validationResult(req);
  const cleanData = matchedData(req);

  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await updateUser(id, cleanData);

    if (!result) return res.status(404).json({
      error: true,
      message: "Data not found."
    });

    res.json({
      error: false,
      message: "Data updated.",
      data: omitPassword(result[1][0])
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error." });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteUser(id);

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