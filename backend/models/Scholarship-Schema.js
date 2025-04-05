const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eligibilityCriteria: { type: String, required: true },
    requiredEduCoins: { type: Number, required: true },
    deadline: { type: Date, required: true },
    applicants: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        appliedAt: { type: Date, default: Date.now },
        grade: String,
        eduCoins: Number
    }],
    selectedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["active", "inactive", "draft"], default: "active" },
    createdAt: { type: Date, default: Date.now },
    amount: { type: Number, required: true, default: 0 }
});

// Check if model exists before creating
const Scholarship = mongoose.models.Scholarship || mongoose.model("Scholarship", scholarshipSchema);

module.exports = Scholarship;
