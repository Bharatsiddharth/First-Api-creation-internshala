// const { default: mongoose} = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentModel = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please fill valid email address']
    },
    password:{
        type:String,
        required:true,
        maxlength:[
            15,"password should not exceed 15 characters"
        ],
        minlength:[
            8,"password should be at least 8 characters"
        ],
        // match:,
        select:false
    },
}, {timestamps:true})

studentModel.pre("save", function() {

    if(!this.isModified("password")) {
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const student = mongoose.model("student", studentModel);

module.exports = student;