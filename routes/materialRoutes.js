
const express = require('express');
const router = express.Router();
const controller = require('../controllers/materialController');

router.post('/add', controller.addMaterial);
router.post('/use/:id', controller.useMaterial);

module.exports = router;
