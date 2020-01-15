const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    os: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});

// Create collection and model
const VoteModel = mongoose.model('Vote', VoteSchema);

module.exports = VoteModel;