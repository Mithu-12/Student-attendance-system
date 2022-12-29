const {model, Schema} = require('mongoose')

const adminAttendance = new Schema({
    timeLimit: Number,
    status: Status,
    createdAt: Date,

})

const AdminAttendance = model('AdminAttendance', adminAttendance)

module.exports = AdminAttendance;