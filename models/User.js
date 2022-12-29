const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },

      message: props => `${props.value, 'email is invalid'}`
    },
  },
  password: {
    type: String,
    required: true,
    minLength:[6, 'password is to short']
  },
  role: {
    type: [String],
    required: true,
    default: ['STUDENT']
  },
  accountStatus: {
    type: String,
    enum: ['PENDING', 'ACTIVE', 'REJECTED'],
    default: 'PENDING',
    required: true
  },
});

const User = model('User', userSchema);

module.exports = User;
