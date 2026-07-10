import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MessageCircle, Phone } from 'lucide-react';

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

      {/* Persistent Floating Actions Dock */}
      {showHeaderFooter && (
        <div className="floating-actions-dock">
          <a 
            href="https://wa.me/918074733591" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="floating-btn whatsapp-btn"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={22} />
          </a>
          <Link 
            to="/contact" 
            className="floating-btn quote-btn"
            title="Book a Call / Get a Quote"
          >
            <Phone size={22} />
          </Link>
        </div>
      )}
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
