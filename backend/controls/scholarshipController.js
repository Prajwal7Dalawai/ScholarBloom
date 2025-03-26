require("dotenv").config();
const Scholar = require("../models/Scholarship-Schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user-schema.js");


module.exports.createScholarship = wrapAsync(async (req, res) => {
    try{
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
    await user.updateOne({ $push: { "universityDetails.scholarshipsOffered": newScholar._id } });
    await newScholar.save();
    res.status(200).json({ message: "Scholarship created" });
}catch(err){
    res.status(400).json({error: err.message});
}
});

module.exports.listScholarships = wrapAsync(async (req, res) => {
    try{
    const currUser = res.locals.currUser;
    const user = await Scholar.find({name: currUser.name});
    res.status(200).json({ scholarships: user.scholarships });
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.getAllScholarships = wrapAsync(async (req, res) => {
    try{
    const scholarships = await Scholar.find({}).select("title description university eligibilityCriteria requiredEduCoins deadline");
    res.status(200).json({ scholarships });
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.listSelectedScholarships = wrapAsync(async (req, res) => {
    try{
    const currUser = res.locals.currUser;
    const user = await Scholar.find({name: currUser.name});
    res.status(200).json({ scholarships: user.selectedScholarships });
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.ScholarshipApplicants = wrapAsync(async (req, res) => {
    try{
    const currUser = res.locals.currUser;
    const user = await Scholar.find({name: currUser.name});
    res.status(200).json({ applicants: user.applicants });
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.applyScholarship = wrapAsync(async (req, res) => {
    try{
        const user = User.findOne({ email: res.locals.currentUser.email });
        const {scholarshipId} = req.body;
        const scholarship = await Scholar.findById(scholarshipId);
        if(scholarship.requiredEduCoins <= user.eduCoins){
            scholarship.applicants.push(user._id);
        await scholarship.save();
        res.json({message: "Applied to scholarship successfully"});
        }else{
            res.status(400).json({error: "Insufficient EduCoins"});
        }
        
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.appliedScholarships = wrapAsync(async (req, res) => {
    try{
    const user = User.findById(res.locals.currentUser.email);
    const scholarships = user.StudentDetails.appliedScholarships;
    appliedscholarships = await Promise.all(scholarships.map(schId=> Scholar.findById(schId)));
    res.status(200).json({appliedscholarships});
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.acceptStudent = wrapAsync(async (req, res) => {
    try{
        const user = User.findById(res.locals.currentUser.email);
        const {scholarshipId, studentId} = req.body;
        const scholarship = await Scholar.findOne({_id: scholarshipId, applicants: {$elemMatch: studentId}});
        scholarship.applicants.forEach(applicant => {
            if(applicant.studentId == studentId){
                applicant.status = "awarded";
            }
        });

    }catch(err){
        res.status(400).json({error: err.message});
    }
});
