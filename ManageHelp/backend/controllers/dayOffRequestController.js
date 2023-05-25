const DayOffRequest = require('../models/dayOffRequest')
const User = require('../models/userModel')

// POST /api/dor
const createDayOffRequest = async (req, res) => {
    const {employee_email, workspace_id, date, reason} = req.body

    try {
        const user = await User.getUserByEmail(employee_email)
        const dor = await DayOffRequest.createNew(user._id, workspace_id, user.name, date, reason)

        if (!dor) { throw Error('Failed to create day off request') }

        res.status(200).json(dor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const approveDayOffRequest = async (req, res) => {
    const { id } = req.params

    try {
        const dor = await DayOffRequest.findOneAndUpdate({_id: id}, {status: 1})

        res.status(200).json(dor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const rejectDayOffRequest = async (req, res) => {
    const { id } = req.params

    try {
        const dor = await DayOffRequest.findOneAndUpdate({_id: id}, {status: 2})

        res.status(200).json(dor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getAllByWorkspace = async (req, res) => {
    const { id } = req.params

    try {
        const list = await DayOffRequest.find({workspace_id: id})
        res.status(200).json(list)
    } catch (error) {
        console.log("error during dayoff request")
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createDayOffRequest,
    approveDayOffRequest,
    rejectDayOffRequest,
    getAllByWorkspace,
}