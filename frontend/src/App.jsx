import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Founder from './pages/Founder';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function AppContent() {
  const location = useLocation();
  const authRoutes = ['/', '/login', '/signup', '/admin/login'];
  const showHeaderFooter = !authRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {showHeaderFooter && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Client Workspace Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Protected Administrator CRM Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
