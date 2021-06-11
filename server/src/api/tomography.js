const express = require('express');
const router = express.Router();

const TomographyController = require('../controllers/TomograghyController');

// GET ALL
router.get('/', TomographyController.index);

// GET ONE
router.get('/:id', TomographyController.show);

// CREATE ONE
router.post('/', TomographyController.store);

// UPDATE ONE
router.put('/:id', TomographyController.update);

// DELETE ONE
router.delete('/:id', TomographyController.delete);

module.exports = router;