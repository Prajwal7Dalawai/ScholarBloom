const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firebaseUID: { type: String, required: true, unique: true }, // Store Firebase UID
    role: { type: String, enum: ["student", "university"], required: true },
    profilePic: { type: String, default: "" }, // Firebase profile picture
    createdAt: { type: Date, default: Date.now },
    location: { 
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" }
    },
});

// Role-specific fields
UserSchema.add({
    studentDetails: {
        eduCoins: { type: Number, default: 0 },
        grade: { type: String, default: "" },
        skills: [{ type: String, default: "" }],
        appliedScholarships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" }],
        appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }]
    },
    universityDetails: {
        postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
        scholarshipsOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" }]
    }
});

// Ensure only the correct role-specific fields are saved
UserSchema.pre("save", function (next) {
    if (this.role === "student") {
        this.universityDetails = undefined; // Remove university details if user is a student
    } else if (this.role === "university") {
        this.studentDetails = undefined; // Remove student details if user is a university
    }
    next();
});

module.exports = mongoose.model("User", UserSchema);
