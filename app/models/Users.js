const mongoose = require('mongoose');
let appSchema = mongoose.Schema;

let userSchema = new appSchema({
    userId: {
        type: String,
        default: '',
        index:true,
        unique:true
    },
    firstName: {
        type: String,
        default: '',
       
    },
    lastName: {
        type: String,
        default: '',
       
    },
    password: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    mobileNumber: {
        type: Number,
        default:0
    },
    createdOn: {
        type: Date,
        default:''
    }

})
module.exports = mongoose.model('users', userSchema)
