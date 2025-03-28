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

export const SymptomsInput = () => {
  const [toggles, setToggles] = useState(
    attributes.reduce((acc, attr) => ({ ...acc, [attr]: false }), {})
  );
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const toggleAttribute = (attr) => {
    setToggles((prev) => ({ ...prev, [attr]: !prev[attr] }));
  };

  return (
    <div className="px-20">
      <div className="w-full flex justify-start">
        <h1 className="text-3xl font-extrabold text-black text-nowrap rounded-full">
          <span className="text-4xl font-bold">Overview</span>
          <br/>
          <span className="text-2xl font-normal">Patient Health</span>
        </h1>
      </div>
      <div className="text-title w-full text-white grid grid-cols-5 mt-5 gap-5">
        <span className="col-span-2 flex gap-1 text-md items-center">Patient Information</span>
        <span className="col-span-3 flex gap-1 text-md items-center">Symptom & Risk Factors Selection</span>
      </div>
      <div className="grid grid-cols-5 items-start text-white w-full gap-5 mt-2">
        <div className="w-full h-1/2 bg-dark-blue p-4 rounded-lg shadow-lg mb-4 col-span-2 text-white">
          <label className="block font-semibold mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4 bg-dark-blue"
            placeholder="Enter your age"
          />

          <label className="block font-semibold mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded-lg bg-dark-blue"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="w-full grid grid-cols-3 gap-4 col-span-3">
          {attributes.map((attr) => (
            <div
              key={attr}
              className="flex justify-between items-center bg-dark-blue text-black px-4 py-1 h-16 rounded-lg shadow-md"
            >
              <span className="font-medium w-1/2 text-white">{attr}</span>
              <div
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
                  toggles[attr] ? "bg-primary-blue" : ""
                }`}
                onClick={() => toggleAttribute(attr)}
              >
                <div
                  className={`w-5 h-5 bg-dark-blue rounded-full shadow-md transition-transform transform ${
                    toggles[attr] ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button className="mt-6 w-52 py-3 rounded-full shadow-md font-semibold text-white bg-primary-blue hover:bg-primary-blue/90">
          Analyze
        </button>
      </div>
    </div>
  );
};
