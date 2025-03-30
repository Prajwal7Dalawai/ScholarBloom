import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HostPages.css";

const HostScholarship = () => {
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState({ name: "", amount: "", deadline: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const scholarships = JSON.parse(localStorage.getItem("scholarships")) || [];
    scholarships.push(scholarship);
    localStorage.setItem("scholarships", JSON.stringify(scholarships));
    navigate("/university-dashboard");
  };

  return (
    <div className="form-container">
      <h2>Host a New Scholarship</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Scholarship Name" required onChange={(e) => setScholarship({ ...scholarship, name: e.target.value })} />
        <input type="text" placeholder="Scholarship Amount" required onChange={(e) => setScholarship({ ...scholarship, amount: e.target.value })} />
        <input type="date" required onChange={(e) => setScholarship({ ...scholarship, deadline: e.target.value })} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HostScholarship;
