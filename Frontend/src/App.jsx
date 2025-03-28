import { Navbar } from "./components/Navbar";
import { PatientAnalysis } from "./components/PatientAnalysis";
import { XrayAnalysis } from "./components/XrayAnalysis";
import { ResultsDashboard } from "./components/ResultsDashboard";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Auth } from './components/Auth';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/patient" element={<PatientAnalysis />} />
        <Route path="/xray" element={<XrayAnalysis />} />
        <Route path="/results" element={<ResultsDashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
