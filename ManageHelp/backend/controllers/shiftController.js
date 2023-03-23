const Shift = require('../models/shiftModel')
const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')

const mongoose = require('mongoose')
const sendEmail = require('../utils/sendEmail')

// POST / | Create a new shift
const createShift = async (req, res) => {
    const {employee_id, workspace_id, schedule_id, date, start_time, end_time, role, published} = req.body
    console.log('Creating shift')

    try {

        const shift = await Shift.createShift(employee_id, workspace_id, schedule_id, date, start_time, end_time, role, published)
        if (!shift) console.log('Failed to create shift')

        res.status(200).json(shift)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// DELETE /:id | Delete a shift by ID
const deleteShift = async (req, res) => {
    const { id } = req.params

    const shift = await Shift.findOneAndDelete({_id: id})
    if (!shift) req.status(400).json({error: 'No such shift'})

    res.status(200).json(shift)

}

// PATCH /:id | Update a shift by ID
const patchShift = async (req, res) => {
    const { id } = req.params

    const shift = await Shift.findOneAndUpdate({_id: id}, {...req.body})
    if (!shift) req.status(400).json({error: 'No such shift'})

    res.status(200).json(shift)
}

// GET /:id | Get a shift by ID
const getByID = async (req, res) => {
    const { id } = req.params

    const shift = await Shift.findOne({_id: id})
    if (!shift) req.status(400).json({error: 'No such shift'})

    res.status(200).json(shift)
}

// GET /user/:user_id
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
    if (!shifts) req.status(400).json({error: 'No shifts for user+workspace'})

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