const express = require('express');

const ufs = require('./ufs');
const doctors = require('./doctors');
const patients = require('./patients');
const status = require('./status');
const cases = require('./cases');
const tomography = require('./tomography');
const report = require('./report');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/doctors', doctors);
router.use('/ufs', ufs);
router.use('/patients', patients);
router.use('/status', status);
router.use('/cases', cases);
router.use('/tomography', tomography);
router.use('/report', report);

module.exports = router;
