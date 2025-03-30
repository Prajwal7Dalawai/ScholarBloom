import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hostpages.css";

const HostJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({ title: "", company: "", salary: "", deadline: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    navigate("/university-dashboard");
  };

  return (
    <div className="form-container">
      <h2>Host a New Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Job Title" required onChange={(e) => setJob({ ...job, title: e.target.value })} />
        <input type="text" placeholder="Company Name" required onChange={(e) => setJob({ ...job, company: e.target.value })} />
        <input type="text" placeholder="Salary" required onChange={(e) => setJob({ ...job, salary: e.target.value })} />
        <input type="date" required onChange={(e) => setJob({ ...job, deadline: e.target.value })} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HostJob;
