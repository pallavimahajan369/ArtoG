import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPaintBrush, FaPlus } from 'react-icons/fa';
import { createSketch } from "../../api/SketchApi"; // import API

const AdminAddSketchPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '', // changed from artist to description
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // loading state

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            alert('Please upload an image.');
            return;
        }

        try {
            setIsLoading(true);

            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("imageFile", imageFile);

            const result = await createSketch(data);
            console.log("Sketch created:", result);

            alert("Sketch added successfully!");
            navigate("/admin/sketches");
        } catch (err) {
            console.error("Error creating sketch:", err);
            alert("Failed to add sketch. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div>
            {/* Breadcrumb Navigation */}
            <div className="mb-4 text-sm text-gray-400">
                <Link to="/admin/sketches" className="hover:text-orange-500 transition-colors">
                    Manage Sketches
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white">Add New Sketch</span>
            </div>

            <h1 className="text-4xl font-bangers text-white tracking-wider drop-shadow-lg mb-8">
                Upload Sketch
            </h1>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Form Fields */}
                    <div className="space-y-6 flex flex-col">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                Sketch Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleTextChange}
                                className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition"
                                required
                                placeholder="e.g., Cybernetic Serenity"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleTextChange}
                                className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition"
                                placeholder="Write a short description of your sketch"
                                rows={4}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-300 mb-2">
                                Sketch Image
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 hover:border-orange-500 transition-colors">
                                <div className="text-center">
                                    <FaPaintBrush className="mx-auto h-12 w-12 text-gray-500" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                        <label
                                            htmlFor="imageUpload"
                                            className="relative cursor-pointer rounded-md font-semibold text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 hover:text-orange-400"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="imageUpload"
                                                name="imageUpload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                accept="image/png, image/jpeg, image/gif"
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    {imageFile && <p className="text-sm text-green-400 mt-2">{imageFile.name}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow"></div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <Link
                                to="/admin/sketches"
                                className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md transition-all duration-300 hover:bg-gray-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:shadow-orange-500/60 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <FaPlus className="h-5 w-5" />
                                <span>{isLoading ? "Uploading..." : "Add Sketch"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Image Preview */}
                    <div>
                        <p className="text-sm font-medium text-gray-300 mb-2">Image Preview</p>
                        <div className="w-full aspect-[3/4] bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center p-2">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Sketch Preview" className="w-full h-full object-contain rounded-md" />
                            ) : (
                                <div className="text-center text-gray-500">
                                    <FaPaintBrush className="h-16 w-16 mx-auto mb-2" />
                                    <p>Upload an image to see a preview.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminAddSketchPage;
