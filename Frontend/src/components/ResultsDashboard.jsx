import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';

export const ResultsDashboard = () => {
    const [xrayResult, setXrayResult] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(null);
    
    // Sample detailed results data
    // Get detailed results from the API response stored in localStorage
    const [detailedResults, setDetailedResults] = useState([]);
    
    useEffect(() => {
        const storedResult = localStorage.getItem('xray_analysis_result');
        if (storedResult) {
            try {
                const parsedResult = JSON.parse(storedResult);
                if (parsedResult && parsedResult.result) {
                    // Transform the API result into the format needed for detailed results
                    const formattedResults = Object.entries(parsedResult.result).map(([disease, currentValue]) => {
                        // Define standard threshold values for each disease
                        const standardValues = {
                            "Atelectasis": 0.63,
                            "Cardiomegaly": 0.64,
                            "Consolidation": 0.68,
                            "Edema": 0.74,
                            "Effusion": 0.70,
                            "Emphysema": 0.60,
                            "Fibrosis": 0.61,
                            "Hernia": 0.65,
                            "Infiltration": 0.61,
                            "Mass": 0.61,
                            "Nodule": 0.55,
                            "Pleural_Thickening": 0.60,
                            "Pneumonia": 0.63,
                            "Pneumothorax": 0.62
                        };
                        
                        const standardValue = standardValues[disease] || 0.60;
                        const numericValue = typeof currentValue === 'string' ? parseFloat(currentValue) : currentValue;
                        const multipliedValue = numericValue * 10; // Multiply the result by 100
                        
                        return {
                            disease,
                            standardValue,
                            currentValue: multipliedValue, // Use the multiplied value
                            status: multipliedValue > standardValue ? "Positive" : "Negative"
                        };
                    });
                    
                    setDetailedResults(formattedResults);
                }
            } catch (err) {
                console.error('Error parsing detailed results:', err);
            }
        }
    }, []);
    
    useEffect(() => {
        // Get xray analysis result from localStorage
        const storedResult = localStorage.getItem('xray_analysis_result');
        if (storedResult) {
            try {
                const parsedResult = JSON.parse(storedResult);
                console.log('Parsed result:', parsedResult);
                
                setXrayResult(parsedResult);
                
                // Set image source if file_path exists
                if (parsedResult.file_path) {
                    const imgUrl = `http://127.0.0.1:8000/user/getimg?path=${encodeURIComponent(parsedResult.file_path)}`;
                    setImageSrc(imgUrl);
                    console.log('Image URL:', imgUrl);
                } else {
                    console.log('No file path found in results');
                    setImageLoading(false);
                }
                
                // Prepare chart data
                if (parsedResult && parsedResult.result) {
                    const abnormalityData = Object.entries(parsedResult.result)
                        .map(([name, probability]) => ({ 
                            name, 
                            probability: typeof probability === 'string' ? parseFloat(probability) : probability 
                        }))
                        .sort((a, b) => b.probability - a.probability);
                    
                    console.log('Prepared chart data:', abnormalityData);
                    setChartData(abnormalityData);
                }
            } catch (err) {
                console.error('Error parsing results:', err);
                setImageLoading(false);
            }
        } else {
            console.log('No xray_analysis_result found in localStorage');
            setImageLoading(false);
        }
    }, []);

    // Handle image load events
    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(null);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError('Failed to load image');
        console.error('Error loading image from:', imageSrc);
    };

    // Get file name from path to display as alternative text
    const getFileName = (filePath) => {
        if (!filePath) return 'No file';
        const parts = filePath.split(/[\/\\]/); // Split by either forward or backward slashes
        return parts[parts.length - 1];
    };

    // Fallback to original data structure if no data is loaded
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
        file_path: (() => {
            const analysisResult = JSON.parse(localStorage.getItem('xray_analysis_result') || '{}');
            return analysisResult.file_path || "https://www.google.com";
        })(),
        prediction: "Suspicious",
        confidence: 78,
        abnormalities: chartData.length > 0 ? chartData : [
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
                            <p className="text-slate-600 w-full mt-2">Date: {new Date().toLocaleDateString()} | Token: {localStorage.getItem('auth_token')?.replace(/.(?=.{10})/g, '*') || ''}</p>
                        </div>
                        {/* <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-600">{combinedRisk.overall}%</div>
                            <div className="text-sm text-slate-600">Overall Risk Score</div>
                        </div> */}
                    </div>
                </div>

                {/* X-ray Analysis Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* X-ray Image Display */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">X-ray Image</h2>
                        <div className="relative aspect-square bg-black rounded-xl overflow-hidden group">
                            {imageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
                                </div>
                            )}
                            
                            {imageSrc && !imageError ? (
                                <img 
                                    src={imageSrc}
                                    alt="Chest X-ray"
                                    className="w-full h-full object-contain"
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                            ) : (
                                <img 
                                    src={`http://127.0.0.1:8000/user/getimg?path=${encodeURIComponent(xrayResult?.file_path || '')}`}
                                    alt="Chest X-ray"
                                    className="w-full h-full object-contain opacity-90"
                                    onError={handleImageError}
                                />
                            )}  
                            
                            {/* Overlay with file info - only show on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <p className="font-medium">Click to view full size</p>
                                    <p className="text-sm text-gray-300">
                                        {xrayResult?.file_path ? getFileName(xrayResult.file_path) : 'Detected regions highlighted'}
                                    </p>
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
                                    AI Analysis
                                </span>
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                    X-ray Analysis
                                </span>
                            </div>
                        </div>

                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {level1Result.abnormalities.slice(0, 4).map((item, index) => (
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
                        </div> */}

                        <div className="h-[600px] mt-6">
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

                {/* Detailed Results Table */}
                <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-800 mb-6">Detailed Analysis Results</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Disease Name</th>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Standard Value</th>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Current Value</th>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailedResults.map((item, index) => (
                                    <tr key={index} className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-slate-50/30' : ''}`}>
                                        <td className="py-3 px-4 text-slate-700 font-medium">{item.disease}</td>
                                        <td className="py-3 px-4 text-slate-600">{item.standardValue.toFixed(2)}</td>
                                        <td className="py-3 px-4 text-slate-600">{item.currentValue.toFixed(8)}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                                                item.status === 'Positive' 
                                                    ? 'bg-red-50 text-red-700' 
                                                    : 'bg-green-50 text-green-700'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Results Grid - Clinical & Combined Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Level 0 - Clinical Analysis */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-slate-800">Patient Data</h2>
                            <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700">
                                Level 0
                            </span>
                        </div>

                        {/* Fetching data from localStorage */}
                        {(() => {
                            const data = JSON.parse(localStorage.getItem('true_false_data'));
                            if (!data) return <p className="text-red-500">No data available</p>;

                            return (
                                <div className="space-y-4">
                                    <p className="text-lg font-bold text-slate-700 border-b border-slate-200 pb-2">Age & Gender</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600">Gender:</span>
                                        <span className="text-slate-800 font-semibold">{data.gender}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600">Age:</span>
                                        <span className="text-slate-800 font-semibold">{data.age}</span>
                                    </div>

                                    <p className="text-lg font-bold text-slate-700 border-b border-slate-200 pb-2">Symptoms</p>
                                    {Object.entries(data.symptoms).map(([symptom, isPresent], index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-slate-600">{symptom.replace(/_/g, ' ')}</span>
                                            <span className={`font-semibold text-xs p-2 px-3 rounded-full ${isPresent ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                                {isPresent ? 'Present' : 'Not Present'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })()}
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
                                            isAnimationActive={true}
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