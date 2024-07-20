
const { catchAsyncError } = require('../middleware/catchAsyncError')
const Student = require('../models/studentModel')
const ErorrHandler = require("../utils/errorHandler");

exports.Homepage = catchAsyncError(async (req,res,next) => {
        res.json({ message: 'Homepage' });    
})

exports.studentsingup = catchAsyncError(async (req,res,next) => {
    const student = await new Student(req.body).save();
    res.status(201).json(student);
})

exports.studentsingin = catchAsyncError(async (req,res,next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password").exec();

    if(!student) return next(new ErorrHandler("Couldn't find user with this email", 404));

    const isMatch = student.comparepassword(req.body.password);
    if(!isMatch) return next(new ErorrHandler("wrong password", 500))

    res.json(student)
})

exports.studentsingout = catchAsyncError(async (req,res,next) => {
    
})