const express = require('express')
const router = express.Router()
const reportController = require('./reportController')

// กำหนดเส้นทาง
router.get('/', reportController.getAllReports)
router.get('/:id', reportController.getReportById)
router.post('/', reportController.createReport)
router.put('/:id', reportController.updateReport)
router.delete('/:id', reportController.deleteReport)

module.exports = router