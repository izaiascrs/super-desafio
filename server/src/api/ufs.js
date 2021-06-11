const express = require('express');
const router = express.Router();

const UfsController = require('../controllers/UfsController');

// GET ALL
router.get('/', UfsController.index);

// GET ONE
router.get('/:id', (req, res) => {   
    res.json(['😀', '😳', '🙄']);
});

// CREATE ONE
router.post('/', UfsController.store);

// UPDATE ONE
router.put('/:id', (req, res) => {
    res.json(['😀', '😳', '🙄']);
});

// DELETE ONE
router.delete('/:id', (req, res) => {
    res.json(['😀', '😳', '🙄']);
});

module.exports = router;