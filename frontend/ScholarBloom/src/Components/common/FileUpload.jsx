import React, { useState } from 'react';
import fileService from '../../services/fileService';
import { toast } from 'react-toastify';

const FileUpload = ({ onUpload, onDelete, existingFiles = [], maxFiles = 5, accept = '*' }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length + existingFiles.length > maxFiles) {
            toast.error(`Maximum ${maxFiles} files allowed`);
            return;
        }
        setFiles(selectedFiles);
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);
        try {
            const uploadPromises = files.map(file => fileService.uploadFile(file));
            const uploadedFiles = await Promise.all(uploadPromises);
            onUpload(uploadedFiles);
            setFiles([]);
            toast.success('Files uploaded successfully');
        } catch (error) {
            toast.error(error.message || 'Failed to upload files');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (fileId) => {
        try {
            await fileService.deleteFile(fileId);
            onDelete(fileId);
            toast.success('File deleted successfully');
        } catch (error) {
            toast.error(error.message || 'Failed to delete file');
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept={accept}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
                >
                    Select Files
                </label>
                {files.length > 0 && (
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                )}
            </div>

            {/* Selected Files */}
            {files.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
                    <ul className="space-y-2">
                        {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between text-sm">
                                <span>{file.name}</span>
                                <span className="text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Existing Files */}
            {existingFiles.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h3>
                    <ul className="space-y-2">
                        {existingFiles.map((file) => (
                            <li key={file._id} className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                    <a
                                        href={fileService.getFileUrl(file._id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        {file.originalName}
                                    </a>
                                </div>
                                <button
                                    onClick={() => handleDelete(file._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUpload; 