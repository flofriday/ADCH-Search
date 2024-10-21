import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/item/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App
