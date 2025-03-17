import {handleStudentSignin, handleUniversitySignin} from '../controls/login-signup.js'

export default function SignUp() {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 shadow-lg rounded-lg w-full max-w-sm">

        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 rounded-l-md transition-all`}
            onClick={handleStudentSignin}
          >
          Signup as Student
          </button>
          <button
            className={`w-1/2 py-2 rounded-l-md transition-all`}
            onClick={handleUniversitySignin}
          >
          Signup as University
          </button>
          
        </div>

      </div>
    </div>
  );
}
