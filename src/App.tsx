import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import './App.css';

function App() {
  return (
    <div className="app">

    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />
          {/* <Route path="/reports" element={
            <div style={{ 
              height: '100vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#666',
              direction: 'rtl'
            }}>
              עמוד דוחות - בפיתוח
            </div>
          } /> */}
          {/* <Route path="/settings" element={
            <div style={{ 
              height: '100vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#666',
              direction: 'rtl'
            }}>
              עמוד הגדרות - בפיתוח
            </div>
          } /> */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      
    </BrowserRouter>
    </div>
  );
}


export default App;