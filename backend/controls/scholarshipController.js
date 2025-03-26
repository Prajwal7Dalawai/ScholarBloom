require("dotenv").config();
const Scholar = require("../models/Scholarship-Schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
module.exports.createScholarship = wrapAsync(async (req, res) => {
    const {name, desc, uni, eligibleCr, minEdu, deadline} = req.body;
    const date = Date.now();
    const newScholar = new Scholar({
        title: name,
        description: desc,
        university: uni,
        eligibilityCriteria: eligibleCr,
        requiredEduCoins: minEdu,
        deadline: deadline,
        createdAt: date
    });
    await newScholar.save();
    res.status(200).json({ message: "Scholarship created" });
});

module.exports.listScholarships = wrapAsync(async (req, res) => {
    const currUser = res.locals.currUser;
    const user = await Scholar.find({name: currUser.name});
    res.status(200).json({ scholarships: user.scholarships });
});

module.exports.getAllScholarships = wrapAsync(async (req, res) => {
    const scholarships = await Scholar.find({}).select("title description university eligibilityCriteria requiredEduCoins deadline");
    res.status(200).json({ scholarships });
});

module.exports.listSelectedScholarships = wrapAsync(async (req, res) => {
    const currUser = res.locals.currUser;
    const user = await Scholar.find({name: currUser.name});
    res.status(200).json({ scholarships: user.selectedScholarships });
});

module.exports.ScholarshipApplicants = wrapAsync(async (req, res) => {
    const currUser = res.locals.currUser;
    const user = await Scholar.find({name: currUser.name});
    res.status(200).json({ applicants: user.applicants });
})