const multer = require('multer');
const upload = multer({ dest: './images/' });

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, Date.now() + '_' + name);
  }
});

// module.exports = multer({storage: storage, limits: { fileSize : 1024 * 1024 * 5 }}).single('image');
module.exports = multer({storage: storage}).single('file'); 
// module.exports = upload.single('file');