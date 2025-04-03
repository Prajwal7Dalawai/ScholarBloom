import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import FileUpload from '../common/FileUpload';

const CourseModal = ({ isOpen, onClose, course = null, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        fee: '',
        startDate: '',
        endDate: '',
        prerequisites: '',
        syllabus: '',
        materials: [],
        status: 'active'
    });

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                duration: course.duration || '',
                fee: course.fee || '',
                startDate: course.startDate ? new Date(course.startDate).toISOString().split('T')[0] : '',
                endDate: course.endDate ? new Date(course.endDate).toISOString().split('T')[0] : '',
                prerequisites: course.prerequisites || '',
                syllabus: course.syllabus || '',
                materials: course.materials || [],
                status: course.status || 'active'
            });
        }
    }, [course]);

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
            materials: [...prev.materials, ...files]
        }));
    };

    const handleFileDelete = (fileId) => {
        setFormData(prev => ({
            ...prev,
            materials: prev.materials.filter(file => file._id !== fileId)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form data
        if (!formData.title || !formData.description || !formData.duration || !formData.fee || !formData.startDate || !formData.endDate) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Validate fee
        if (isNaN(formData.fee) || formData.fee < 0) {
            toast.error('Please enter a valid fee amount');
            return;
        }

        // Validate duration
        if (isNaN(formData.duration) || formData.duration <= 0) {
            toast.error('Please enter a valid duration');
            return;
        }

        // Validate dates
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        if (startDate < new Date()) {
            toast.error('Start date cannot be in the past');
            return;
        }
        if (endDate <= startDate) {
            toast.error('End date must be after start date');
            return;
        }

        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {course ? 'Edit Course' : 'Create New Course'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title *</label>
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
                        <label className="block text-sm font-medium text-gray-700">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Duration (in months) *</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fee (₹) *</label>
                            <input
                                type="number"
                                name="fee"
                                value={formData.fee}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date *</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
                        <textarea
                            name="prerequisites"
                            value={formData.prerequisites}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Syllabus</label>
                        <textarea
                            name="syllabus"
                            value={formData.syllabus}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Materials</label>
                        <FileUpload
                            onUpload={handleFileUpload}
                            onDelete={handleFileDelete}
                            existingFiles={formData.materials}
                            maxFiles={10}
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
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
                            <option value="completed">Completed</option>
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
                            {course ? 'Update Course' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseModal; 