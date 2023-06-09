const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const shiftRequestSchema = new Schema({
    /*
    Defines the fields in the shift request such as the email of the person sending the request,
    the request date, and the email of the person who the user is sending the request to
    */
    requesterID: {
        type: String,
        required: true,
    },
    requesterName: {
        type: String,
        required: true,
    },
    requestdate: {
        type: Date,
        required: true,
    },
    accepteeID: {
        type: String,
        required: true
    },
    accepteeName: {
        type: String,
        required: true
    },
    workspaceID: {
        type: String,
        required: true
    },
    status: {
        required: true,
        type: Number,
        default: 0, // 0=pending, 1=approved by colleague, 2=approved by manager, 3=rejected
    }
})



module.exports = mongoose.model('ShiftRequest', shiftRequestSchema)