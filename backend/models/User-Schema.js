const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firebaseUID: { type: String, required: true, unique: true }, // Store Firebase UID
    role: { type: String, enum: ["student", "university", "admin"], required: true },
    profilePic: { type: String, default: "" }, // Firebase profile picture
    createdAt: { type: Date, default: Date.now }
});

// Role-specific fields
UserSchema.add({
    studentDetails: {
        collegeID: { type: String },
        eduCoins: { type: Number, default: 0 },
        appliedScholarships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" }]
    },
    universityDetails: {
        universityName: { type: String },
        postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
        scholarshipsOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" }]
    }
});

module.exports = mongoose.model("User", UserSchema);
