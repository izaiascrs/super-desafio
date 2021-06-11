const express = require('express');
const router = express.Router();

const CasesController = require('../controllers/CasesController');

// GET ALL
router.get('/', CasesController.index);

// GET ONE
router.get('/:id', CasesController.show);

// CREATE ONE
router.post('/', CasesController.store);

// UPDATE ONE
router.put('/:id', CasesController.update);

// DELETE ONE
router.delete('/:id', CasesController.delete);

module.exports = router;