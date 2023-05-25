const ShiftRequest = require('../models/shiftRequestModel')
const User = require('../models/userModel')

const createNewShiftRequest = async (req, res) => {
    var { user, date, email, workspace } = req.body
    console.log("wid: " + workspace._id)
    console.log("creation email: " + email)
    try {
        const acceptee = await User.getUserByEmail(email)
        if (!acceptee) throw Error('No such user')
        const accepteeID = acceptee._id;
        const accepteeName = acceptee.name;

        const userinfo = await User.getUserByEmail(user.email)
        if (!userinfo) throw Error('No such user')
        const requesterID = userinfo._id;
        const requesterName = userinfo.name;

        const existinshiftrequest = await ShiftRequest.findOne({requesterID: requesterID, requestdate: date})
        console.log(existinshiftrequest)
        if (existinshiftrequest) {
            return res.status(404).json({error: 'Shift request already exists for given date'})
        }
        
        try {
            const requestdate = date
            const shiftrequest = await ShiftRequest.create({requesterID, requesterName, requestdate, accepteeID, accepteeName, workspaceID: workspace._id})
            res.status(200).json(shiftrequest)
        } catch (error) {
            console.log("error in creating shiftrequest")
            res.status(400).json({error: error.message})
        }
    } catch (error) {
        console.log("error during shiftrequest creation")
        res.status(400).json({error: error.message})
    }
}


const getEmpShiftRequests = async (req, res) => {
    var { email, workspace } = req.params

    try {
        const user = await User.getUserByEmail(email)
        if (!user) throw Error('No such user')
        var existinshiftrequests = await ShiftRequest.find({ $and: [{workspaceID: workspace}, { $or: [{requesterID: user._id}, {accepteeID: user._id}]}]})
    } catch (error) {
        console.log("error during shiftrequest get")
        console.log(error.message)
        res.status(400).json({error: error.message})
    }

    res.status(200).json(existinshiftrequests)
}

const getManShiftRequests = async (req, res) => {
    var { workspace } = req.params

    try {
        var existinshiftrequests = await ShiftRequest.find({workspaceID: workspace})
    } catch (error) {
        console.log("error during manshiftrequest get")
        console.log(error.message)
        res.status(400).json({error: error.message})
    }

    res.status(200).json(existinshiftrequests)
}

const getListShiftRequests = async (req, res) => {
    var { id } = req.params

    try {
        const user = await User.getUserByEmail(id)
        if (!user) throw Error('No such user')
        var existinshiftrequests = await ShiftRequest.find({requestemail: user._id})
       
    } catch (error) {
        console.log("error during shiftrequest get")
        console.log(error.message)
        res.status(400).json({error: error.message})
    }

    res.status(200).json(existinshiftrequests)
}

const approveTradeRequest = async (req, res) => {
    const { id } = req.params

    try {
        const shift = await ShiftRequest.findOneAndUpdate({_id: id}, {status: 2})  
        res.status(200).json(shift)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const rejectTradeRequest = async (req, res) => {
    const { id } = req.params

    try {
        const shift = await ShiftRequest.findOneAndUpdate({_id: id}, {status: 3})
        res.status(200).json(shift)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const empApproveTradeRequest = async (req, res) => {
    const { id } = req.params

    try {
        const shift = await ShiftRequest.findOneAndUpdate({_id: id}, {status: 1})
        res.status(200).json(shift)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { createNewShiftRequest , getEmpShiftRequests , getManShiftRequests, approveTradeRequest, empApproveTradeRequest, rejectTradeRequest, getListShiftRequests }