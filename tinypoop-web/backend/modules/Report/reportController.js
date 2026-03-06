const prisma = require('../../config/db');

exports.getAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        place: {
          select: {
            name: true,
            address: true
          }
        },
        locate: {
          select: {
            building_name: true,
            floor: true,
            room: true
          }
        }
      }
    })
    res.json(reports)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch reports' })
  }
}

exports.createReport = async (req, res) => {
  try {
    const { place_id, user_id, locate_id, content, status, assigned_staff_id, complete_at , create_at } = req.body
    const newReport = await prisma.report.create({
      data: { place_id, user_id, locate_id, content, status, assigned_staff_id, complete_at , create_at },
    })
    res.status(201).json(newReport)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create report' })
  }
}

exports.getReportById = async (req, res) =>{
  try {
    const {id} = req.params
    const report = await prisma.report.findUnique({
      where: {id:id},
      include: {
        place: true,
        locate: true
      }
    })
    res.json(report)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get report' })
  }
}

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params
    const { place_id, user_id, locate_id, content, status, assigned_staff_id, complete_at , create_at } = req.body
    const updatedReport = await prisma.report.update({
      where: { id: id },
      data: { place_id, user_id, locate_id, content, status, assigned_staff_id, complete_at , create_at },
    })
    res.json(updatedReport)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update report' })
  }
}

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.report.delete({ where: { id: id } })
    res.status(200).json({ message: 'Report deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete report' })
  }
}
