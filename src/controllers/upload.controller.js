const upload = require('../utils/helper/upload-helper');

const router = require('express').Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({
      error: true,
      message: "No file uploaded."
    });

    res.json({
      error: false,
      message: "File uploaded successfully."
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Error uploading file: " + err
    });
  }
});

module.exports = router;