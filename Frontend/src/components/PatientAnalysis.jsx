import { useState } from "react";

const attributes = [
  "SMOKING",
  "YELLOW FINGERS", 
  "ANXIETY",
  "PEER PRESSURE",
  "CHRONIC DISEASE",
  "FATIGUE",
  "ALLERGY", 
  "WHEEZING",
  "ALCOHOL CONSUMING",
  "COUGHING",
  "SHORTNESS OF BREATH",
  "SWALLOWING DIFFICULTY",
  "CHEST PAIN",
];

export const PatientAnalysis = () => {
  const [toggles, setToggles] = useState(
    attributes.reduce((acc, attr) => ({ ...acc, [attr]: false }), {})
  );
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const toggleAttribute = (attr) => {
    setToggles((prev) => ({ ...prev, [attr]: !prev[attr] }));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* === LEFT SECTION - TITLE AND ILLUSTRATION === */}
          <div className="lg:w-1/3">
            <div className="sticky top-10 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold">
                  <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    Overview
                  </span>
                  <span className="text-2xl lg:text-3xl font-light text-slate-600 mt-2 block">
                    Patient Health Analysis
                  </span>
                </h1>
                <p className="text-slate-600 leading-relaxed max-w-md">
                  Complete your health profile by providing information and selecting relevant symptoms for a comprehensive analysis.
                </p>
              </div>

              {/* Medical Illustration */}
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
                <img
                  src="/medical-consultation.svg"
                  alt="Medical consultation"
                  className="relative w-full h-auto max-w-md mx-auto drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* === RIGHT SECTION - FORM AND SYMPTOMS === */}
          <div className="lg:w-2/3 space-y-8">
            {/* Patient Info Form */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:bg-white/90 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-slate-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Patient Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Age Input */}
                <div className="space-y-2">
                  <label className="block font-medium text-slate-700">Age</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full p-4 pl-12 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                      placeholder="Enter age"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Gender Select */}
                <div className="space-y-2">
                  <label className="block font-medium text-slate-700">Gender</label>
                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-4 pl-12 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Symptoms Selection */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:bg-white/90 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-slate-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Symptoms & Risk Factors
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {attributes.map((attr) => (
                  <div
                    key={attr}
                    className="flex justify-between items-center bg-white/90 px-5 py-4 rounded-xl hover:shadow-md transition-all duration-300 border border-slate-100"
                  >
                    <span className="font-medium text-slate-700">{attr}</span>
                    <div
                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                        toggles[attr] ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-slate-200"
                      }`}
                      onClick={() => toggleAttribute(attr)}
                    >
                      <div
                        className={`size-4 bg-white rounded-full shadow-lg transition-transform duration-300 transform ${
                          toggles[attr] ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analyze Button */}
            <div className="flex justify-end">
              <button className="group px-12 py-4 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                Analyze Results
                <svg className="inline-block w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
