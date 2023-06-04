// same instance of mongoose require is used by node
const mongoose = require('mongoose');
const { Schema } = mongoose;

const habit = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Habit = mongoose.model('Habit', habit);

module.exports = Habit;