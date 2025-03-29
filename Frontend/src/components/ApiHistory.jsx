import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

// Add this new component for the carousel modal
const ConditionsModal = ({ isOpen, onClose, conditions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const conditionsArray = Object.entries(conditions);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % conditionsArray.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + conditionsArray.length) % conditionsArray.length
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-slate-800">
            Condition Details
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Carousel */}
        <div className="relative p-4">
          <div className="mb-8">
            <div className="text-center">
              <h4 className="text-lg font-medium text-slate-700 mb-2">
                {conditionsArray[currentIndex][0]}
              </h4>
              <div className="text-3xl font-bold text-indigo-600 mb-4">
                {(conditionsArray[currentIndex][1] * 100).toFixed(1)}%
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${conditionsArray[currentIndex][1] * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <svg
                className="w-6 h-6 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="text-sm text-slate-600">
              {currentIndex + 1} / {conditionsArray.length}
            </div>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <svg
                className="w-6 h-6 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {conditionsArray.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-indigo-600 w-4" : "bg-slate-300"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ApiHistory = () => {
  const [apiRequests, setApiRequests] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [userStatus, setUserStatus] = useState({
    isPremium: false,
    isActive: false,
    used: 0,
    limit: 0
  });

  useEffect(() => {
    fetchApiHistory();
    fetchData();
  }, []);

  const fetchApiHistory = async () => {
    // This is example data structure matching your JSON
    const authToken = localStorage.getItem('auth_token');
    const response = await fetch(`http://127.0.0.1:8000/user/gethistory/?auth_token=${authToken}`);
    const data = await response.json();
    console.log(data.history)
    const mockData = data.history;

    // Convert the object to array and add timestamp as a field
    const formattedData = Object.entries(mockData).map(([timestamp, data]) => ({
      timestamp,
      ...data,
    }));

    setApiRequests(formattedData);
  };

  const fetchData = async () => {
    // This would be your API call
    // Mock JSON data structure
    const authToken = localStorage.getItem('auth_token');
    const response = await fetch(`http://127.0.0.1:8000/user/gethistory/?auth_token=${authToken}`);
    const data = await response.json();
    console.log(data.graph_data)
    const mockResponse = {
      "status": {
        "usage": {
          "used": data.graph_data.usage.used,
          "limit": data.graph_data.usage.limit
        },
        "user": {
          "isPremium": data.graph_data.user.isPremium,
          "isActive": data.graph_data.user.isActive
        }
      }
    }; // Use the fetched data as status.status

    // Transform the data for the pie chart
    const transformedData = [
      {
        name: 'Used',
        value: mockResponse.status.usage.used
      },
      {
        name: 'Available',
        value: mockResponse.status.usage.limit - mockResponse.status.usage.used
      }
    ];

    setChartData(transformedData);
    setUserStatus({
      isPremium: mockResponse.status.user.isPremium,
      isActive: mockResponse.status.user.isActive,
      used: mockResponse.status.usage.used,
      limit: mockResponse.status.usage.limit
    });
  };

  // Format the result based on the model level
  const formatResult = (result, model) => {
    if (model === "level0") {
      return result === 1 ? "1" : "0";
    } else if (model === "level1") {
      // Find the condition with highest probability
      const topCondition = Object.entries(result).reduce((max, current) => {
        return current[1] > max[1] ? current : max;
      });
      return `${topCondition[0]}: ${(topCondition[1] * 100).toFixed(1)}%`;
    }
    return "Unknown";
  };

  const CurlCommand = () => {
    return (
      <pre className="text-slate-600">
        curl -X POST -H "Content-Type: application/json" -d '{{"auth_token": "95023e811cdbfcece2930550a1896d027000e48c6ff29223fbf0b620a8c57549", "symptoms": [0, 55, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2]}}' http://127.0.0.1:8000/api/0/level0
      </pre>
    );
  };

  console.log(CurlCommand())
  const COLORS = ["#4F46E5", "#E5E7EB"];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex-1 overflow-y-auto p-8">
        {/* Header with Summary */}
        <div className="mb-8 bg-white/80 backdrop-blur rounded-2xl p-6 border border-blue-100 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                API Request History
              </h1>
              <p className="text-slate-600 mt-2">
                Total Requests: {apiRequests.length} | Last Updated:{" "}
                {new Date().toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">
                {(
                  (apiRequests.filter((req) => req.status < 400).length /
                    apiRequests.length) *
                  100
                ).toFixed(1)}
                %
              </div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
          </div>

        </div>

        {/* Charts Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 w-full gap-4">

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300 flex-1 mt-4 md:mt-0 w-1/2">
            <h2 className="text-lg font-semibold text-slate-800">Auth Token</h2>
            <div className="flex relative items-end justify-between mt-2 mb-5 gap-2">
                <span className="text-slate-600 p-2 rounded-lg bg-slate-100">
                <span dangerouslySetInnerHTML={{ __html: `curl -X POST -H "Content-Type: application/json" -d '{{"auth_token": "${localStorage.getItem('auth_token')}", "symptoms": [0, 55, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2]}}' http://127.0.0.1:8000/api/0/level0` }} />
              </span>
              <button
                className="absolute right-2 bottom-2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 transition duration-200"
                onClick={() => {
                  navigator.clipboard.writeText(localStorage.getItem('auth_token'));
                  alert('Auth token copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
              
            <hr />

            <h2 className="text-lg font-semibold text-slate-800">Auth Token</h2>
            <div className="flex relative items-end justify-between mt-2 mb-5 gap-2 w-full">
                <span className="text-slate-600 p-2 rounded-lg bg-slate-100">
                <span dangerouslySetInnerHTML={{ __html: localStorage.getItem('auth_token')}} />
              </span>
              <button
                className="absolute right-2 bottom-2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 transition duration-200"
                onClick={() => {
                  navigator.clipboard.writeText(localStorage.getItem('auth_token'));
                  alert('Auth token copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
          </div>

          

          {/* API Usage Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300 flex-1 mt-4 md:mt-0">

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-slate-800">API Usage</h2>
                <div className="flex gap-2">
                  {userStatus.isPremium && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 00-.894.553L7.382 6H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V8a1 1 0 100-2h-3.382l-1.724-3.447A1 1 0 0010 2zm0 2.618L11.724 8H8.276L10 4.618z" clipRule="evenodd" />
                      </svg>
                      Premium
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${userStatus.isActive
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    <span className={`w-2 h-2 rounded-full ${userStatus.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {userStatus.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{userStatus.used}</div>
                <div className="text-sm text-slate-600">Used</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-600">{userStatus.limit}</div>
                <div className="text-sm text-slate-600">Limit</div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value, name) => [`${value} requests`, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Usage Warning if close to limit */}
            {userStatus.used / userStatus.limit > 0.8 && (
              <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>You're approaching your API usage limit</span>
              </div>
            )}
          </div>
        </div>

        {/* Updated Request History Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Request History
            </h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                Latest First
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {apiRequests.map((request, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {new Date(request.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${request.status_code < 400
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {request.status_code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${request.model === "level0"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-indigo-100 text-indigo-800"
                          }`}
                      >
                        {request.model}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-600">
                          {formatResult(request.result, request.model)}
                        </span>
                        {request.model === "level1" && (
                          <button
                            className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
                            onClick={() => setModalData(request.result)}
                          >
                            View all conditions →
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-2 text-slate-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">Auto-refreshes every 5 minutes</span>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export Data
            </button>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/20">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Now
            </button>
          </div>
        </div>

        {/* Add the modal component */}
        <ConditionsModal
          isOpen={modalData !== null}
          onClose={() => setModalData(null)}
          conditions={modalData || {}}
        />
      </div>
    </div>
  );
};
