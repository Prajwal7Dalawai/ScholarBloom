const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // University offering the scholarship
    eligibilityCriteria: { type: String, required: true }, // Example: "GPA > 8.0"
    requiredEduCoins: { type: Number, required: true }, // Cost for students to apply
    deadline: { type: Date, required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of students who applied
    selectedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of students awarded
    status: { type: String, enum: ["open", "closed", "awarded"], default: "open" },
    createdAt: { type: Date, default: Date.now },
    amount: { type: Number, required: true, default: 0 }
});

// Check if model exists before creating
const Scholarship = mongoose.models.Scholarship || mongoose.model("Scholarship", scholarshipSchema);

module.exports = Scholarship;
