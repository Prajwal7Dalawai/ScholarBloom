import React, { useState } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  CloudArrowUpIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: 'ಸ್ಕಾಲರ್ ಬ್ಲೂಮ್',
    siteDescription: 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಶೈಕ್ಷಣಿಕ ಅವಕಾಶಗಳು',
    emailNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
    defaultLanguage: 'kn',
    currency: 'INR',
    maxFileUploadSize: 5,
    termsAndConditions: '',
    privacyPolicy: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // TODO: Save settings to API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSuccess(true);
    } catch (error) {
      setError('ಸೆಟ್ಟಿಂಗ್ಸ್ ಅನ್ನು ಸಂಗ್ರಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center">
          <Cog6ToothIcon className="h-8 w-8 text-gray-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">ವ್ಯವಸ್ಥೆ ಸೆಟ್ಟಿಂಗ್ಸ್</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">ಸಾಮಾನ್ಯ ಸೆಟ್ಟಿಂಗ್ಸ್</h3>
                  <p className="mt-1 text-sm text-gray-500">ಅಪ್ಲಿಕೇಶನ್‌ನ ಮೂಲ ಸೆಟ್ಟಿಂಗ್ಸ್</p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                      ಸೈಟ್ ಹೆಸರು
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="siteName"
                        id="siteName"
                        value={settings.siteName}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                      ಸೈಟ್ ವಿವರಣೆ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="siteDescription"
                        id="siteDescription"
                        value={settings.siteDescription}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">ಅಧಿಸೂಚನೆಗಳು</h3>
                  <p className="mt-1 text-sm text-gray-500">ಇಮೇಲ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ</p>
                </div>

                <div className="mt-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="emailNotifications"
                        name="emailNotifications"
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                        ಇಮೇಲ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ
                      </label>
                      <p className="text-gray-500">ಬಳಕೆದಾರರಿಗೆ ಇಮೇಲ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ಕಳುಹಿಸಿ</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">ಭಾಷೆ ಮತ್ತು ಕರೆನ್ಸಿ</h3>
                  <p className="mt-1 text-sm text-gray-500">ಪ್ರದರ್ಶನ ಭಾಷೆ ಮತ್ತು ಕರೆನ್ಸಿಯನ್ನು ಹೊಂದಿಸಿ</p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700">
                      ಡೀಫಾಲ್ಟ್ ಭಾಷೆ
                    </label>
                    <div className="mt-1">
                      <select
                        id="defaultLanguage"
                        name="defaultLanguage"
                        value={settings.defaultLanguage}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="kn">ಕನ್ನಡ</option>
                        <option value="en">English</option>
                        <option value="hi">हिंदी</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                      ಕರೆನ್ಸಿ
                    </label>
                    <div className="mt-1">
                      <select
                        id="currency"
                        name="currency"
                        value={settings.currency}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="INR">₹ (INR)</option>
                        <option value="USD">$ (USD)</option>
                        <option value="EUR">€ (EUR)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">ಫೈಲ್ ಅಪ್‌ಲೋಡ್</h3>
                  <p className="mt-1 text-sm text-gray-500">ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಸೀಮೆಗಳನ್ನು ಹೊಂದಿಸಿ</p>
                </div>

                <div className="mt-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="maxFileUploadSize" className="block text-sm font-medium text-gray-700">
                      ಗರಿಷ್ಠ ಫೈಲ್ ಗಾತ್ರ (MB)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="maxFileUploadSize"
                        id="maxFileUploadSize"
                        value={settings.maxFileUploadSize}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  ರದ್ದುಮಾಡಿ
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {loading ? 'ಸಂಗ್ರಹಿಸುತ್ತಿದೆ...' : 'ಸಂಗ್ರಹಿಸಿ'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 