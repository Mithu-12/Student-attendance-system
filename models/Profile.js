const  {model, Schema} = require('mongoose')

const profileSchema = new Schema({
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    phone: String,
    avatar: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const ProfileSchema = model('ProfileSchema', profileSchema)

module.exports = ProfileSchema;