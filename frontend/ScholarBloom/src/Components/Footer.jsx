import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-black mb-4">Contact Us</h3>
            <p className="text-black dark:text-black">
              Email: info@scholarbloom.com<br />
              Phone: +91 1234567890<br />
              Address: Bangalore, Karnataka
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-black mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-black dark:text-black hover:text-primary-600 dark:hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-black dark:text-black hover:text-primary-600 dark:hover:text-primary-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-black dark:text-black hover:text-primary-600 dark:hover:text-primary-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-black dark:text-black hover:text-primary-600 dark:hover:text-primary-400">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-black mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-black dark:text-black hover:text-primary-600 dark:hover:text-primary-400">
                Facebook
              </a>
              <a href="#" className="text-black dark:text-black hover:text-primary-600 dark:hover:text-primary-400">
                Twitter
              </a>
              <a href="#" className="text-black dark:text-black hover:text-primary-600 dark:hover:text-primary-400">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-black dark:text-black">
            © {new Date().getFullYear()} ScholarBloom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 