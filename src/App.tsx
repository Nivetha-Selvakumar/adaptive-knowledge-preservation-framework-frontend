import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login/login';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LoginPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;