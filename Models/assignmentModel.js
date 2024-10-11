import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    admin_name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
