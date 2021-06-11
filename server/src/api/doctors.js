const express = require('express');
const router = express.Router();

const DoctorController = require('../controllers/DoctorController');

// GET ALL
router.get('/',DoctorController.index);

// GET ONE
router.get('/:id', DoctorController.show);

// CREATE ONE
router.post('/', DoctorController.store);

// UPDATE ONE
router.put('/:id', DoctorController.update);

// DELETE ONE
router.delete('/:id', DoctorController.delete);

module.exports = router;