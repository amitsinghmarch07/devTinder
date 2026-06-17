const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserid: {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    toUserId: {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ['ignored', 'rejected', 'accepted', 'interested'],
            message: '{VALUE} is not a correct status'
        }
    }
}, {
    timestamps: true
});

const ConnectionRequest = new mongoose.Model("ConnectionRequest", connectionRequestSchema);
module.exports = {
    ConnectionRequest
}

