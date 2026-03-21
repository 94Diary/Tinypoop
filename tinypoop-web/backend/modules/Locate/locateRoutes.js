const express = require('express');
const router = express.Router();
const locateController = require('./locateController');

// กำหนดเส้นทาง
router.get('/',locateController.getAllLocates)
router.get('/:id', locateController.getLocateById)
router.post('/', locateController.createLocate)
router.delete('/:id', locateController.deleteLocate)

module.exports = router