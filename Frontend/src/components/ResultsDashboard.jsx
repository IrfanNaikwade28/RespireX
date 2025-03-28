import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const ResultsDashboard = () => {
    // Dummy data - replace with actual results
    const level0Result = {
        prediction: "High Risk",
        confidence: 85,
        riskFactors: [
            { factor: "Smoking", impact: 0.8 },
            { factor: "Chest Pain", impact: 0.7 },
            { factor: "Shortness of Breath", impact: 0.6 },
        ]
    };

    const level1Result = {
        prediction: "Suspicious",
        confidence: 78,
        abnormalities: [
            { name: "Mass", probability: 0.75 },
            { name: "Nodule", probability: 0.65 },
            { name: "Infiltration", probability: 0.45 }
        ]
    };

    const combinedRisk = {
        overall: 82,
        data: [
            { name: 'Clinical Assessment', value: level0Result.confidence },
            { name: 'Image Analysis', value: level1Result.confidence }
        ]
    };

    const COLORS = ['#4F46E5', '#818CF8', '#C7D2FE'];

    return (
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {/* Header with Summary */}
                <div className="mb-8 bg-white/80 backdrop-blur rounded-2xl p-6 border border-blue-100 shadow-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                Analysis Results
                            </h1>
                            <p className="text-slate-600 mt-2">Patient ID: #12345 | Date: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-600">{combinedRisk.overall}%</div>
                            <div className="text-sm text-slate-600">Overall Risk Score</div>
                        </div>
                    </div>
                </div>

                {/* X-ray Analysis Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* X-ray Image Display */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">X-ray Image</h2>
                        <div className="relative aspect-square bg-black rounded-xl overflow-hidden group">
                            {/* Replace with actual X-ray image */}
                            <img 
                                src="/sample-xray.jpg" 
                                alt="Chest X-ray"
                                className="w-full h-full object-cover opacity-90"
                            />
                            {/* Overlay with detected regions */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <p className="font-medium">Click to view full size</p>
                                    <p className="text-sm text-gray-300">Detected regions highlighted</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                            <span>Image Quality: High</span>
                            <span>Resolution: 2048x2048</span>
                        </div>
                    </div>

                    {/* Detection Details */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-slate-800">Abnormality Detection</h2>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                                    AI Verified
                                </span>
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                    Level 1
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {level1Result.abnormalities.map((item, index) => (
                                <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-slate-700">{item.name}</span>
                                        <span className="text-sm font-semibold text-indigo-600">
                                            {(item.probability * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                                            style={{ width: `${item.probability * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-64 mt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={level1Result.abnormalities}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip 
                                        contentStyle={{ 
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Bar 
                                        dataKey="probability" 
                                        fill="url(#colorGradient)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <defs>
                                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#4F46E5" />
                                            <stop offset="100%" stopColor="#818CF8" />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Results Grid - Clinical & Combined Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Level 0 - Clinical Analysis */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-slate-800">Clinical Analysis</h2>
                            <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700">
                                Level 0
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Risk Assessment</p>
                                <p className="text-2xl font-bold text-indigo-600">{level0Result.prediction}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-600 mb-1">Confidence</p>
                                <p className="text-2xl font-bold text-indigo-600">{level0Result.confidence}%</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm font-medium text-slate-700">Key Risk Factors</p>
                            {level0Result.riskFactors.map((factor, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-slate-600">{factor.factor}</span>
                                    <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-indigo-500 rounded-full"
                                            style={{ width: `${factor.impact * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Combined Analysis */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-slate-800 mb-6">Combined Risk Analysis</h2>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    <svg className="w-40 h-40 transform -rotate-90">
                                        <circle
                                            className="text-slate-200"
                                            strokeWidth="10"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="70"
                                            cx="80"
                                            cy="80"
                                        />
                                        <circle
                                            className="text-indigo-600"
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="70"
                                            cx="80"
                                            cy="80"
                                            strokeDasharray={`${combinedRisk.overall * 4.4} 440`}
                                        />
                                    </svg>
                                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-slate-800">
                                        {combinedRisk.overall}%
                                    </span>
                                </div>
                            </div>
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={combinedRisk.data}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={50}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {combinedRisk.data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-8">
                    <div className="flex items-center gap-2 text-slate-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Report
                        </button>
                        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/20">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share Results
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}; 