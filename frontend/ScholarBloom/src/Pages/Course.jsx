import React, { useState } from "react";
import CourseCard from "../Components/ui/Coursecard"; // Import the new component
import "./Scholarship.css"; // Import CSS for page layout
import aiCourse from "../assets/CoursePhotos/c1.png";
import webDev from "../assets/CoursePhotos/c2.png";
import dataScience from "../assets/CoursePhotos/c3.png";
import cybersecurity from "../assets/CoursePhotos/c4.png";
import cloudComputing from "../assets/CoursePhotos/c5.png";
import blockchain from "../assets/CoursePhotos/c6.png";

const courses = [
  { 
    id: 1, 
    title: "", 
    instructor: "Dr. John Doe", 
    duration: "6 Weeks", 
    image: aiCourse 
  },
  { 
    id: 2, 
    title: "Full-Stack Web Development", 
    instructor: "Prof. Jane Smith", 
    duration: "8 Weeks", 
    image: webDev 
  },
  { 
    id: 3, 
    title: "Data Science Essentials", 
    instructor: "Dr. Alex Brown", 
    duration: "10 Weeks", 
    image: dataScience 
  },
  { 
    id: 4, 
    title: "Cybersecurity Fundamentals", 
    instructor: "Prof. Lisa Green", 
    duration: "5 Weeks", 
    image: cybersecurity 
  },
  { 
    id: 5, 
    title: "Cloud Computing Basics", 
    instructor: "Dr. Mark Wilson", 
    duration: "7 Weeks", 
    image: cloudComputing 
  },
  { 
    id: 6, 
    title: "Blockchain for Beginners", 
    instructor: "Prof. Emily Davis", 
    duration: "6 Weeks", 
    image: blockchain 
  },
];

const CoursePage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollInCourse = (id) => {
    if (!enrolledCourses.includes(id)) {
      setEnrolledCourses([...enrolledCourses, id]);
    }
  };

  return (
    <div className="scholarship-container">
      <h1 className="scholarship-title">Course Portal</h1>
      <div className="scholarship-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            enrolledCourses={enrolledCourses}
            enrollInCourse={enrollInCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
