const mongoose = require('mongoose');

exports.connectionDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connection established")
    } catch (error) {
        console.log(error)
    }
}