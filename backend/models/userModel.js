const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(email) {
        return validator.isEmail(email) && email.endsWith('@bmsce.ac.in');
      },
      message: 'Please enter a valid BMSCE email'
    }
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Please enter a valid 10-digit mobile number'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  address: {
    type: String,
    trim: true,
    maxlength: 200
  },
  hostelRoom: {
    type: String,
    trim: true,
    maxlength: 10
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);