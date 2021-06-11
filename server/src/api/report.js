const express = require('express');
const router = express.Router();

const ReportController = require('../controllers/ReportController');

router.get('/', ReportController.show);

module.exports= router;