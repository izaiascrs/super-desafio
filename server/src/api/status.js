const express = require('express');
const router = express.Router();

const StatusController = require('../controllers/StatusController');

// GET ALL
router.get('/', StatusController.index);

// GET ONE
router.get('/:id', (req, res) => {   
    res.json(['😀', '😳', '🙄']);
});

// CREATE ONE
router.post('/', StatusController.store);

// UPDATE ONE
router.put('/:id', (req, res) => {
    res.json(['😀', '😳', '🙄']);
});

// DELETE ONE
router.delete('/:id', (req, res) => {
    res.json(['😀', '😳', '🙄']);
});

module.exports = router;