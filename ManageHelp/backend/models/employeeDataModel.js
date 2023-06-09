const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    creatorName: {
        type: String
    },
    text: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    assignedTo: {
        type: String
    }


}, { timestamps: true })

const employeeDataSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    workspace_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    job_title: {
        type: String,
        required: true,
        default: 'Employee'
    },
    pay_rate: {
        type: Number,
        required: true,
        default: 0.00
    },
    weekly_hours_worked: {
        type: Number,
        required: true,
        default: 10
    }, 
    points: {
        type: Number,
        required: true,
        default: 0
    },
    tasks: [taskSchema]
})

employeeDataSchema.statics.createNew = async function (user_id, workspace_id, job_title, pay_rate, weekly_hours_worked, points) {

    if (!user_id) throw Error("must give user id")
    if (!workspace_id) throw Error('must give workspace id')
    if (!job_title) throw Error('must give job title')
    if (!pay_rate) throw Error('must give pay rate')

    const edm = await this.create({
        user_id: user_id, 
        workspace_id: workspace_id, 
        job_title: job_title, 
        pay_rate: pay_rate, 
        weekly_hours_worked: weekly_hours_worked,
        points: points
    })

    return edm

}

employeeDataSchema.statics.findOrCreate = async function (workspace_id, user_id) {

    let edm = await this.findOne({user_id: user_id, workspace_id: workspace_id})
    if (!edm) {
        edm = await this.createNew(user_id, workspace_id, 'No Title Yet', 1, 10, 0)
    }

    return edm

}



employeeDataSchema.statics.findByWorkspace = async function (workspace_id) {

    let edm = await this.find({workspace_id: workspace_id})
    
    return edm

}

const EmployeeData = mongoose.model('EmployeeData', employeeDataSchema)
const Task = mongoose.model('Task', taskSchema)

module.exports = { EmployeeData, Task }