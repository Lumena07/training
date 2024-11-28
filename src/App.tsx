import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { TrainingPage } from './pages/TrainingPage';
import { SchedulePage } from './pages/SchedulePage';
import { DocumentsPage } from './pages/DocumentsPage';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/training" replace />} />
          <Route path="training" element={<TrainingPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="documents" element={<DocumentsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;