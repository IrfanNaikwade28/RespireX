import { Navbar } from "./components/Navbar";
import { PatientAnalysis } from "./components/PatientAnalysis";
import { XrayAnalysis } from "./components/XrayAnalysis";
import { ResultsDashboard } from "./components/ResultsDashboard";
import { ApiHistory } from "./components/ApiHistory";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from './components/Auth';
import { Upgrade } from "./components/upgrade";
import { Features } from "./components/Features";
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/patient" element={<PatientAnalysis />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/features" element={<Features />} />
        <Route path="/results" element={<ResultsDashboard />} />
        <Route path="/apihistory" element={<ApiHistory />} />
        <Route path="/upgrade" element={<Upgrade/>} />
        <Route path="/xray" element={<XrayAnalysis />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
