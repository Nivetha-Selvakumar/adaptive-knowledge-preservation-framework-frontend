import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login/login';
import { CreateUserPage } from './components/auth/CreateUserPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { SignupPage } from './components/auth/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC AUTH ROUTES */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* PROTECTED PLATFORM ROUTES */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/agents" element={<DashboardPage />} />
        <Route path="/settings" element={<DashboardPage />} />

        {/* CATCH ALL FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;