import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AnalysisPage from './pages/AnalysisPage'
import ReportPage from './pages/ReportPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis/:jobId" element={<AnalysisPage />} />
        <Route path="/report/:reportId" element={<ReportPage />} />
      </Routes>
    </Router>
  )
}

export default App
