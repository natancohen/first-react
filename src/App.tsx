import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import './styles/App.css';

function App() {
  return (
    <div className="app" dir="rtl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;