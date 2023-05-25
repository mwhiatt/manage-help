const Shift = require('../models/shiftModel')
const Schedule = require('../models/scheduleModel')
const User = require('../models/userModel')

const createShift = async (req, res) => {
    const {employee_email, workspace_id, schedule_id, start_time, end_time, role, published} = req.body

    try {
        const emp = await User.getUserByEmail(employee_email)
        const shift = await Shift.createShift(emp._id, workspace_id, schedule_id, start_time, end_time, role, published)
        const schedule = await Schedule.findOneAndUpdate({_id: schedule_id}, {$push: {shift_list: shift._id}})

        if (!shift) console.log('Failed to create shift')

        res.status(200).json(shift)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const deleteShift = async (req, res) => {
    const { id } = req.params

    const shift = await Shift.findOneAndDelete({_id: id})
    await Schedule.findOneAndUpdate({_id: shift.schedule_id}, {$pull: {shift_list: {$in: [shift._id]}}})
    if (!shift) req.status(400).json({error: 'No such shift'})

    res.status(200).json(shift)
}

const patchShift = async (req, res) => {
    const { id } = req.params

    const shift = await Shift.findOneAndUpdate({_id: id}, {...req.body})
    if (!shift) req.status(400).json({error: 'No such shift'})

    res.status(200).json(shift)
}

const getByID = async (req, res) => {
    const { id } = req.params

    const shift = await Shift.findOne({_id: id})
    if (!shift) res.status(400).json({error: 'No such shift'})

    res.status(200).json(shift)
}

const getAllByUser = async (req, res) => {
    const { user_id } = req.params

    const shifts = await Shift.find({employee_id: user_id})
    if (!shifts) req.status(400).json({error: 'No shifts for user'})

    res.status(200).json(shifts)
}

const getAllByWorkspace = async (req, res) => {
    const { workspace_id } = req.params

    const shifts = await Shift.find({workspace_id})
    if (!shifts) req.status(400).json({error: 'No shifts for workspace'})

    res.status(200).json(shifts)
}

const getAllByUserAndWorkspace = async (req, res) => {
    const {workspace_id, user_id } = req.params

    const shifts = await Shift.find({workspace_id: workspace_id, employee_id: user_id})
    if (!shifts) req.status(400).json({error: 'No shifts for user and workspace'})

    res.status(200).json(shifts)
}

module.exports = {
    createShift,
    deleteShift,
    patchShift,
    getByID,
    getAllByUser,
    getAllByWorkspace,
    getAllByUserAndWorkspace,
}