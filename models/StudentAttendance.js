const {model, Schema} = require('mongoose')

const studentAttendance = new Schema({
    createdAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendance',
        
    }
    
})

const StudentAttendance = model('StudentAttendance', studentAttendance)

module.exports = StudentAttendance;