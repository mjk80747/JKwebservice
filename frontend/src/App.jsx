import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MessageCircle, Phone } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Founder = lazy(() => import('./pages/Founder'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppContent() {
  const location = useLocation();
  const authRoutes = ['/', '/login', '/signup', '/admin/login'];
  const showHeaderFooter = !authRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {showHeaderFooter && <Navbar />}
      <main className="main-content">
        <Suspense fallback={
          <div className="suspense-loading-container">
            <div className="suspense-spinner"></div>
            <p className="suspense-text">Loading GastroSuite...</p>
          </div>
        }>
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
        </Suspense>
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
