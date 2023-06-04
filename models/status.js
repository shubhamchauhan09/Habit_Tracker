// same instance of mongoose require is used by node
const mongoose = require('mongoose');
const { Schema } = mongoose;

const status = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    habit: {
        type: Schema.Types.ObjectId,
        ref: 'Habit',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Status = mongoose.model('status', status);
module.exports = Status;