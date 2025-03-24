import React from "react";
import './Landing.css'


export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      {/* Platform Overview */}
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600">Welcome to EduQuest</h1>
        <p className="text-gray-600 mt-4">
          A learning platform where students earn <b>EduCoins</b> by solving <b>AI challenges</b> and unlocking <b>scholarships</b>.
        </p>
        <div className="mt-6 space-x-4 grid grid-cols-2 gap-2">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold">Sign Up</button>
          <button className="bg-gray-700 text-white px-6 py-2 rounded-md">Login</button>
        </div>
      </div>
    </div>
  );
}
