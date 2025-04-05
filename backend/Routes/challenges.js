const express = require("express");
const router = express.Router();
const Challenge = require("../models/Challenge");
const User = require("../models/user-schema");
const { verifyToken } = require("../middleware");

// Get all challenges
router.get("/", async (req, res) => {
    try {
        console.log('Fetching all challenges...');
        const challenges = await Challenge.find();
        console.log(`Found ${challenges.length} challenges`);
        res.json(challenges);
    } catch (error) {
        console.error("Error fetching challenges:", error);
        res.status(500).json({ 
            error: "Failed to fetch challenges", 
            details: error.message 
        });
    }
});

// Get challenge by ID
router.get("/:id", async (req, res) => {
    try {
        console.log(`Fetching challenge with ID: ${req.params.id}`);
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            console.log('Challenge not found');
            return res.status(404).json({ error: "Challenge not found" });
        }
        console.log('Challenge found:', challenge.title);
        res.json(challenge);
    } catch (error) {
        console.error("Error fetching challenge:", error);
        res.status(500).json({ 
            error: "Failed to fetch challenge", 
            details: error.message 
        });
    }
});

// Create new challenge (university only)
router.post("/", verifyToken, async (req, res) => {
    try {
        console.log('Creating new challenge...');
        if (req.user.role !== "university") {
            console.log('Unauthorized: Only universities can create challenges');
            return res.status(403).json({ error: "Only universities can create challenges" });
        }

        const challenge = new Challenge({
            ...req.body,
            universityId: req.user._id
        });

        await challenge.save();
        console.log('Challenge created successfully:', challenge._id);

        // Add challenge to university's posted challenges
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { "universityDetails.postedChallenges": challenge._id } }
        );

        res.status(201).json(challenge);
    } catch (error) {
        console.error("Error creating challenge:", error);
        res.status(500).json({ 
            error: "Failed to create challenge", 
            details: error.message 
        });
    }
});

// Update challenge (university only)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        console.log(`Updating challenge with ID: ${req.params.id}`);
        const challenge = await Challenge.findById(req.params.id);
        
        if (!challenge) {
            console.log('Challenge not found');
            return res.status(404).json({ error: "Challenge not found" });
        }

        if (challenge.universityId.toString() !== req.user._id.toString()) {
            console.log('Unauthorized: Only the creating university can update this challenge');
            return res.status(403).json({ error: "Only the creating university can update this challenge" });
        }

        const updatedChallenge = await Challenge.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        console.log('Challenge updated successfully');
        res.json(updatedChallenge);
    } catch (error) {
        console.error("Error updating challenge:", error);
        res.status(500).json({ 
            error: "Failed to update challenge", 
            details: error.message 
        });
    }
});

// Delete challenge (university only)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        console.log(`Deleting challenge with ID: ${req.params.id}`);
        const challenge = await Challenge.findById(req.params.id);
        
        if (!challenge) {
            console.log('Challenge not found');
            return res.status(404).json({ error: "Challenge not found" });
        }

        if (challenge.universityId.toString() !== req.user._id.toString()) {
            console.log('Unauthorized: Only the creating university can delete this challenge');
            return res.status(403).json({ error: "Only the creating university can delete this challenge" });
        }

        // Remove challenge from university's posted challenges
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { "universityDetails.postedChallenges": challenge._id } }
        );

        // Remove challenge from all students' applied challenges
        await User.updateMany(
            { "studentDetails.appliedChallenges": challenge._id },
            { $pull: { "studentDetails.appliedChallenges": challenge._id } }
        );

        await challenge.deleteOne();
        console.log('Challenge deleted successfully');
        res.json({ message: "Challenge deleted successfully" });
    } catch (error) {
        console.error("Error deleting challenge:", error);
        res.status(500).json({ 
            error: "Failed to delete challenge", 
            details: error.message 
        });
    }
});

// Apply for challenge (student only)
router.post("/:id/apply", verifyToken, async (req, res) => {
    try {
        console.log(`Processing challenge application for ID: ${req.params.id}`);
        if (req.user.role !== "student") {
            console.log('Unauthorized: Only students can apply for challenges');
            return res.status(403).json({ error: "Only students can apply for challenges" });
        }

        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            console.log('Challenge not found');
            return res.status(404).json({ error: "Challenge not found" });
        }

        // Check if student has already applied
        if (req.user.studentDetails.appliedChallenges.includes(challenge._id)) {
            console.log('Student has already applied for this challenge');
            return res.status(400).json({ error: "You have already applied for this challenge" });
        }

        // Add challenge to student's applied challenges
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { "studentDetails.appliedChallenges": challenge._id } }
        );

        console.log('Challenge application submitted successfully');
        res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
        console.error("Error submitting challenge application:", error);
        res.status(500).json({ 
            error: "Failed to submit application", 
            details: error.message 
        });
    }
});

module.exports = router; 