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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-indigo-600 w-4" : "bg-slate-300"
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

  useEffect(() => {
    fetchApiHistory();
  }, []);

  const fetchApiHistory = async () => {
    // This is example data structure matching your JSON
    const mockData = {
      "2025-03-29 02:36:46.060014": {
        status: true,
        message: "Prediction successful",
        method: "POST",
        model: "level0",
        result: 1,
        status_code: 200,
      },
      "2025-03-29 02:36:53.245987": {
        status: true,
        message: "File uploaded successfully",
        method: "POST",
        model: "level1",
        result: {
          Atelectasis: 0.0999097153544426,
          Cardiomegaly: 0.0284122433513403,
          Consolidation: 0.0650446116924286,
          Edema: 0.0253956951200962,
          Effusion: 0.166715428233147,
          Emphysema: 0.0307994820177555,
          Fibrosis: 0.0139704626053572,
          Hernia: 0.0017922242404893,
          Infiltration: 0.277768164873123,
          Mass: 0.0892783105373383,
          Nodule: 0.0827349498867989,
          Pleural_Thickening: 0.0519755035638809,
          Pneumonia: 0.0216902587562799,
          Pneumothorax: 0.0690135955810547,
        },
        status_code: 200,
      },
    };

    // Convert the object to array and add timestamp as a field
    const formattedData = Object.entries(mockData).map(([timestamp, data]) => ({
      timestamp,
      ...data,
    }));

    setApiRequests(formattedData);
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

  const chartData = [
    {
      name: "Successful",
      value: apiRequests.filter((req) => req.status < 400).length,
    },
    {
      name: "Failed",
      value: apiRequests.filter((req) => req.status >= 400).length,
    },
  ];


  const COLORS = ["#4F46E5", "#F44336"];

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
        <div className="flex justify-center items-center mb-8 w-full">
          {/* Status Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-slate-800">
                  Status Distribution
                </h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-.894.553L7.382 6H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V8a1 1 0 100-2h-3.382l-1.724-3.447A1 1 0 0010 2zm0 2.618L11.724 8H8.276L10 4.618z" clipRule="evenodd" />
                    </svg>
                    Premium
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Active
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                Real-time
              </span>
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
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
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
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          request.status_code < 400
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status_code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          request.model === "level0"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {request.model.toUpperCase()}
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
