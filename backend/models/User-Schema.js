const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, "Full name is required"] },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: { 
        type: String, 
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    firebaseUID: { type: String, unique: true, sparse: true }, // Optional Firebase UID
    role: { 
        type: String, 
        enum: ["student", "university"], 
        required: [true, "Role is required"],
        default: "student"
    },
    profilePic: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    location: { 
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" }
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date }
});

// Role-specific fields
UserSchema.add({
    studentDetails: {
        eduCoins: { type: Number, default: 0 },
        grade: { type: String, default: "" },
        skills: [{ type: String }],
        appliedScholarships: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Scholarship",
            validate: {
                validator: async function(v) {
                    return await mongoose.model('Scholarship').exists({ _id: v });
                },
                message: props => `${props.value} is not a valid scholarship ID`
            }
        }],
        appliedJobs: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Job",
            validate: {
                validator: async function(v) {
                    return await mongoose.model('Job').exists({ _id: v });
                },
                message: props => `${props.value} is not a valid job ID`
            }
        }]
    },
    universityDetails: {
        postedJobs: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Job",
            validate: {
                validator: async function(v) {
                    return await mongoose.model('Job').exists({ _id: v });
                },
                message: props => `${props.value} is not a valid job ID`
            }
        }],
        scholarshipsOffered: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Scholarship",
            validate: {
                validator: async function(v) {
                    return await mongoose.model('Scholarship').exists({ _id: v });
                },
                message: props => `${props.value} is not a valid scholarship ID`
            }
        }]
    }
});

// Update timestamps
UserSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
});

// Ensure only the correct role-specific fields are saved
UserSchema.pre("save", function(next) {
    if (this.role === "student") {
        this.universityDetails = undefined;
    } else if (this.role === "university") {
        this.studentDetails = undefined;
    }
    next();
});

// Add index for better query performance
UserSchema.index({ role: 1 });

// Add virtual field for full name
UserSchema.virtual('name').get(function() {
    return this.fullName;
});

// Add method to check if user is active
UserSchema.methods.isActiveUser = function() {
    return this.isActive;
};

// Add method to update last login
UserSchema.methods.updateLastLogin = function() {
    this.lastLogin = Date.now();
    return this.save();
};

module.exports = mongoose.model("User", UserSchema);
