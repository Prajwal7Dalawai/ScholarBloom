const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firebaseUID: { type: String, required: true, unique: true }, // Store Firebase UID
    role: { type: String, enum: ["student", "university"], required: true },
    profilePic: { type: String, default: "" }, // Firebase profile picture
    createdAt: { type: Date, default: Date.now }
});

// Role-specific fields
UserSchema.add({
    studentDetails: {
        eduCoins: { type: Number, default: 0 },
        appliedScholarships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" }],
        appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }]
    },
    universityDetails: {
        universityName: {
            type: String,
            required: function () { return this.role === "university"; } // Required only for universities
        },
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
