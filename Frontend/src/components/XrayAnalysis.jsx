export const XrayAnalysis = () => {
    // Dummy data simulation as if received from level 0
    const patientData = {
        age: 45,
        gender: "Male",
        symptoms: {
            "SMOKING": true,
            "YELLOW FINGERS": true,
            "ANXIETY": false,
            "PEER PRESSURE": false,
            "CHRONIC DISEASE": true,
            "FATIGUE": true,
            "ALLERGY": false,
            "WHEEZING": true,
            "ALCOHOL CONSUMING": true,
            "COUGHING": true,
            "SHORTNESS OF BREATH": true,
            "SWALLOWING DIFFICULTY": false,
            "CHEST PAIN": true
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
                        <div className="group relative border-2 border-dashed border-blue-200 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors duration-300">
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                            <div className="p-8 text-center">
                                <div className="mb-4">
                                    <svg className="mx-auto h-16 w-16 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">Upload X-ray Image</h3>
                                <p className="text-slate-500 mb-4">Drag and drop your file here, or click to browse</p>
                                <span className="text-sm text-slate-400">Supported formats: DICOM, PNG, JPG, GIF (max. 10MB)</span>
                            </div>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Clinical Notes</label>
                        <textarea 
                            className="w-full min-h-[120px] rounded-xl border border-slate-200 p-4 text-slate-600 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200" 
                            placeholder="Enter your clinical observations, findings, or additional notes..."
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button className="flex-1 bg-slate-100 text-slate-600 py-3 px-6 rounded-xl hover:bg-slate-200 transition-all duration-200">
                            Save Draft
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                            Analyze Image
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
