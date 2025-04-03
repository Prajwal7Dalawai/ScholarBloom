import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import FileUpload from '../common/FileUpload';

const ScholarshipModal = ({ isOpen, onClose, scholarship, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        deadline: '',
        eligibilityCriteria: '',
        documents: [],
        status: 'active'
    });

    useEffect(() => {
        if (scholarship) {
            setFormData({
                title: scholarship.title,
                description: scholarship.description,
                amount: scholarship.amount,
                deadline: scholarship.deadline,
                eligibilityCriteria: scholarship.eligibilityCriteria,
                documents: scholarship.documents || [],
                status: scholarship.status
            });
        }
    }, [scholarship]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (files) => {
        setFormData(prev => ({
            ...prev,
            documents: [...prev.documents, ...files]
        }));
    };

    const handleFileDelete = (fileId) => {
        setFormData(prev => ({
            ...prev,
            documents: prev.documents.filter(file => file._id !== fileId)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.title || !formData.description || !formData.amount || !formData.deadline) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (isNaN(formData.amount) || formData.amount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        const deadlineDate = new Date(formData.deadline);
        if (deadlineDate < new Date()) {
            toast.error('Deadline cannot be in the past');
            return;
        }

        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">
                    {scholarship ? 'Edit Scholarship' : 'Create New Scholarship'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Eligibility Criteria</label>
                        <textarea
                            name="eligibilityCriteria"
                            value={formData.eligibilityCriteria}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Required Documents</label>
                        <FileUpload
                            onUpload={handleFileUpload}
                            onDelete={handleFileDelete}
                            existingFiles={formData.documents}
                            maxFiles={5}
                            accept=".pdf,.doc,.docx"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            {scholarship ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScholarshipModal; 