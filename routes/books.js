const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const booksCtrl = require('../controllers/Ctrl-Books');
const multer = require('../middleware/multer-config');

router.get('/', booksCtrl.getAllBook);
router.post('/', auth, multer, booksCtrl.createBook);
router.get('/:id', auth, booksCtrl.getOneBook);
router.put('/:id', auth, multer, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);

module.exports = router;