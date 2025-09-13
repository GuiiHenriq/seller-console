import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useMobile } from './hooks/useMobile';
import { Sidebar } from './components/ui/Sidebar';
import { LeadsPage } from './pages/LeadsPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';

function App() {
  const isMobile = useMobile();

  return (
    <Router>
      <div>
        <Toaster position="top-right" />
        
        {/* Mobile Layout: Menu on top, content below */}
        {isMobile ? (
          <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
              <Routes>
                <Route path="/" element={<Navigate to="/leads" replace />} />
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/opportunities" element={<OpportunitiesPage />} />
              </Routes>
            </main>
          </div>
        ) : (
          /* Desktop Layout: Sidebar on left, content on right */
          <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="flex w-0 flex-1 flex-col overflow-hidden">
              <main className="flex-1 relative overflow-y-auto focus:outline-none">
                <Routes>
                  <Route path="/" element={<Navigate to="/leads" replace />} />
                  <Route path="/leads" element={<LeadsPage />} />
                  <Route path="/opportunities" element={<OpportunitiesPage />} />
                </Routes>
              </main>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
