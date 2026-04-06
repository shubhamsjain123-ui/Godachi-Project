const mongoose = require('mongoose');
const emailLogSchema = new mongoose.Schema({
    emailType: String,
    to: String,
    time: Date,
    viewedAt: Date
}, {
    timestamps: false
});

const emailLog = module.exports = mongoose.model("emailLog", emailLogSchema);

emailLog.log = (data) => {
    return data.save((error, doc) => {
        if (error) {
            console.log(error);
        }
    })
}