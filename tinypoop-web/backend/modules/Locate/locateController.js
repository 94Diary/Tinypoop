const prisma = require('../../config/db')

exports.getAllLocates = async (req ,res) =>{
    try {
        const locates = await prisma.Locate.findMany()    
        res.json(locates)
    }catch (error){
        console.error(error)
        res.status(500).json({error: 'Failed to fetch locates'})
    }
}

exports.getLocateById = async (req, res) =>{
    try {
        const {id} = req.params
        const locate = await prisma.Locate.findUnique({where: {id:id}})
        req.json(locate)
    }catch (error){
        res.status(500).json({error: 'Failed to get locate'})
    }
}

exports.createLocate = async (req, res) =>{
    try {
        const {locate_id, building_name, place_id, floor, room} = req.body
        const newLocate = await prisma.Locate.create({
            data: {locate_id, building_name, place_id, floor, room}
        })
        res.status(201).json(newLocate)
    }catch (error){
        res.status(500).json({error: 'Failed to create locate'})
    }
}

exports.deleteLocate = async (req, res) =>{
    try {
        const {id} = req.params
        await prisma.Locate.delete({where: {id:id}})
        res.status(200).json({message: 'Locate deleted successfully'})
    }catch (error){
        res.status(500).json({error: 'Failed to delete locate'})
    }
}