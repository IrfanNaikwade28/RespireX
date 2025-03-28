import { useState } from 'react';

export const XrayAnalysis = () => {
    // Dummy data simulation as if received from level 0
    console.log(localStorage.getItem('true_false_data'))
    const patientData = JSON.parse(localStorage.getItem('true_false_data'))
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [clinicalNotes, setClinicalNotes] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/dicom'];
            if (!validTypes.includes(file.type) && !file.name.endsWith('.dcm')) {
                setError('Please upload a valid image file (DICOM, PNG, JPG, GIF)');
                return;
            }
            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError('File size should be less than 10MB');
                return;
            }

            setSelectedFile(file);
            setError('');

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError('Please select a file to upload');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        // Using 'image' as the parameter name as specified in the level1Analysis view
        formData.append('image', selectedFile);
        formData.append('clinical_notes', clinicalNotes);
        formData.append('auth_token', localStorage.getItem('auth_token') || '');
        formData.append('patient_data', JSON.stringify(patientData));

        try {
            // Make sure this endpoint matches your Django URL configuration
            const response = await fetch('http://127.0.0.1:8000/user/level1/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status !== false) {
                setAnalysisResult(data);
                // Store the results if needed
                localStorage.setItem('xray_analysis_result', JSON.stringify(data));
                // Redirect or handle success
                window.location.href = '/results';
            } else {
                setError(data.message || 'Analysis failed. Please try again.');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError(`Failed to process your request: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Left Dashboard - 30% width */}
            <div className="w-[30%] bg-white p-8 shadow-md overflow-hidden flex flex-col">
                {/* Profile Summary Card */}
                <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 flex-shrink-0">
                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-3 mb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Patient Overview
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-50">
                            <label className="text-sm font-medium text-slate-600">Age</label>
                            <div className="text-2xl font-semibold text-slate-800 mt-1">
                                {patientData.age}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-50">
                            <label className="text-sm font-medium text-slate-600">Gender</label>
                            <div className="text-2xl font-semibold text-slate-800 mt-1">
                                {patientData.gender}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Symptoms Section */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-3 mb-6 flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Clinical Indicators
                    </h2>
                    <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                        <div className="space-y-3">
                            {Object.entries(patientData.symptoms).map(([symptom, value]) => (
                                <div key={symptom} 
                                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-md ${
                                        value 
                                            ? 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-100' 
                                            : 'bg-white border border-slate-100'
                                    }`}>
                                    <span className={`text-sm font-medium ${value ? 'text-red-700' : 'text-slate-600'}`}>
                                        {symptom}
                                    </span>
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        value 
                                            ? 'bg-red-100 text-red-700' 
                                            : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {value ? 'Present' : 'Absent'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content Area - 70% width */}
            <div className="w-[70%] p-8 bg-slate-50 overflow-y-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                    <h2 className="text-2xl font-semibold mb-8 text-slate-800 flex items-center gap-3">
                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                        X-ray Analysis
                    </h2>
                    
                    {/* X-ray Upload Area */}
                    <div className="mb-8">
                        <div className={`group relative border-2 border-dashed rounded-2xl transition-colors duration-300 
                            ${error ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-slate-50 hover:bg-blue-50'}`}>
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                accept="image/*,.dcm"
                                onChange={handleFileSelect}
                            />
                            <div className="p-8 text-center">
                                {previewUrl ? (
                                    <div className="mb-4">
                                        <img 
                                            src={previewUrl} 
                                            alt="Selected X-ray" 
                                            className="max-h-64 mx-auto object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-4">
                                        <svg className="mx-auto h-16 w-16 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                )}
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                                    {selectedFile ? selectedFile.name : 'Upload X-ray Image'}
                                </h3>
                                <p className="text-slate-500 mb-4">
                                    {selectedFile ? 'Click to change file' : 'Drag and drop your file here, or click to browse'}
                                </p>
                                <span className="text-sm text-slate-400">Supported formats: DICOM, PNG, JPG, GIF (max. 10MB)</span>
                            </div>
                        </div>
                        {error && (
                            <div className="mt-2 text-red-500 text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Notes Section */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Clinical Notes</label>
                        <textarea 
                            value={clinicalNotes}
                            onChange={(e) => setClinicalNotes(e.target.value)}
                            className="w-full min-h-[120px] rounded-xl border border-slate-200 p-4 text-slate-600 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200" 
                            placeholder="Enter your clinical observations, findings, or additional notes..."
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button 
                            onClick={() => {
                                setSelectedFile(null);
                                setPreviewUrl(null);
                                setClinicalNotes('');
                                setError('');
                            }}
                            className="flex-1 bg-slate-100 text-slate-600 py-3 px-6 rounded-xl hover:bg-slate-200 transition-all duration-200"
                        >
                            Clear Form
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={loading || !selectedFile}
                            className={`flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 flex items-center justify-center gap-2
                                ${loading || !selectedFile 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:from-blue-700 hover:to-indigo-700'}`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                <>
                                    Analyze Image
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
