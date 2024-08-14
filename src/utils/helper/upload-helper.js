const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../uploads'));
  },
  filename: (req, file, cb) => {
    const fileNameArray = file.originalname.split('.');
    const fileName = fileNameArray[0];
    const fileType = fileNameArray[fileNameArray.length - 1];

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${fileName}-${uniqueSuffix}.${fileType}`);
  }
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}

const upload = multer({ storage, fileFilter: imageFilter });

module.exports = upload;

