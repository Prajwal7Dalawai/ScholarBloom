const Submission = require('../models/Submission');

// Get all submissions
exports.getSubmissions = async (req, res) => {
    try {
        const { userId, status, sortBy, limit } = req.query;
        let query = {};
        
        if (userId) query.userId = userId;
        if (status) query.status = status;

        let submissions = await Submission.find(query)
            .sort(sortBy ? { [sortBy]: 1 } : { createdAt: -1 })
            .limit(limit ? parseInt(limit) : 10);

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific submission
exports.getSubmission = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.submissionId);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new submission
exports.createSubmission = async (req, res) => {
    try {
        const submission = new Submission({
            ...req.body,
            userId: req.user._id
        });
        await submission.save();
        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a submission
exports.updateSubmission = async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(
            req.params.submissionId,
            req.body,
            { new: true }
        );
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a submission
exports.deleteSubmission = async (req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.submissionId);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        res.json({ message: 'Submission deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 