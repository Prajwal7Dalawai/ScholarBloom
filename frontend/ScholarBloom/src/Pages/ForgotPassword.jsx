import React from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../Components/auth/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ಅಥವಾ{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ
            </Link>
          </p>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword; 