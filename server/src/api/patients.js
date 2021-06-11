const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/PatientController');

// GET ALL
router.get('/', PatientController.index);

// GET ONE
router.get('/:id', PatientController.show);

// CREATE ONE
router.post('/', PatientController.store);

// UPDATE ONE
router.put('/:id', PatientController.update);

// DELETE ONE
router.delete('/:id', PatientController.delete);

module.exports = router;