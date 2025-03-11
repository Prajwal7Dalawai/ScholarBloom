import { useState } from "react";

export default function SignUp() {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    universityName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 shadow-lg rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          Signup as {userType === "student" ? "Student" : "University"}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 rounded-l-md transition-all ${
              userType === "student"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
          <button
            className={`w-1/2 py-2 rounded-r-md transition-all ${
              userType === "university"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setUserType("university")}
          >
            University
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            /><br></br>
          </div>

          <div className="flex flex-col">
            
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            /> <br></br>
          </div>

          <div className="flex flex-col">
            
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            /> <br></br>
          </div>

          {userType === "university" && (
            <div className="flex flex-col">
              <input
                type="text"
                name="universityName"
                placeholder="Enter university name"
                className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              /> <br></br>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 shadow-md hover:bg-blue-600 transition-all"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
