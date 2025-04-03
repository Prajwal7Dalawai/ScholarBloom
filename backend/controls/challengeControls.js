const Challenge = require('../models/Challenge');
const Submission = require('../models/Submission');

// Get all challenges
exports.getChallenges = async (req, res) => {
  try {
    const { status, sortBy, limit } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    let challenges = await Challenge.find(query);

    if (sortBy) {
      challenges.sort((a, b) => {
        if (sortBy === 'deadline') {
          return a.deadline - b.deadline;
        }
        return 0;
      });
    }

    if (limit) {
      challenges = challenges.slice(0, parseInt(limit));
    }

    res.json(challenges);
  } catch (error) {
    console.error('Error getting challenges:', error);
    res.status(500).json({ message: 'Error getting challenges' });
  }
};

// Get a specific challenge
exports.getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    console.error('Error getting challenge:', error);
    res.status(500).json({ message: 'Error getting challenge' });
  }
};

// Create a new challenge
exports.createChallenge = async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ message: 'Error creating challenge' });
  }
};

// Update a challenge
exports.updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(req.params.challengeId, req.body, { new: true });
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    console.error('Error updating challenge:', error);
    res.status(500).json({ message: 'Error updating challenge' });
  }
};

// Delete a challenge
exports.deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    console.error('Error deleting challenge:', error);
    res.status(500).json({ message: 'Error deleting challenge' });
  }
};

// Get challenge submissions
exports.getSubmissions = async (req, res) => {
  try {
    const { userId, status, sortBy, limit } = req.query;
    const query = {};

    if (userId) {
      query.userId = userId;
    }

    if (status) {
      query.status = status;
    }

    let submissions = await Submission.find(query);

    if (sortBy) {
      submissions.sort((a, b) => {
        if (sortBy === 'date') {
          return b.createdAt - a.createdAt;
        }
        return 0;
      });
    }

    if (limit) {
      submissions = submissions.slice(0, parseInt(limit));
    }

    res.json(submissions);
  } catch (error) {
    console.error('Error getting challenge submissions:', error);
    res.status(500).json({ message: 'Error getting challenge submissions' });
  }
}; 