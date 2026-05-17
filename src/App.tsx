import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/layout';
import { 
  HomePage, 
  ClientSection, 
  RecruiterSection, 
  ContactPage, 
  ProcessPage,
  RecentWorksPage,
  GalleryPage,
  AboutPage,
  NotFoundPage,
  AdminDashboard,
  LoginPage
} from './pages';
import { Preloader } from './components/ui';
import { LiquidGlassCardTest } from './components/test/LiquidGlassCardTest';
import { PixelPerfectButtonTest } from './components/test/PixelPerfectButtonTest';
import { AnimatedTextTest } from './components/test/AnimatedTextTest';
import { AnimatedTextDemo } from './components/test/AnimatedTextDemo';
import { ParallaxCardTest } from './components/test/ParallaxCardTest';
import './App.css';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        
        {!showPreloader && (
          <>
            <Routes>
              {/* Login route - Public */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Admin route - Protected */}
              <Route 
                path="/padmin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Root path - Audience Choice */}
              <Route path="/" element={<HomePage />} />
              
              {/* All other routes with MainLayout */}
              <Route path="*" element={
                <MainLayout>
                  <Routes>
                    <Route path="/clients" element={<ClientSection />} />
                    <Route path="/recruiters" element={<RecruiterSection />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/recent-works" element={<RecentWorksPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/process" element={<ProcessPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/test/liquid-glass-card" element={<LiquidGlassCardTest />} />
                    <Route path="/test/pixel-perfect-button" element={<PixelPerfectButtonTest />} />
                    <Route path="/test/animated-text" element={<AnimatedTextTest />} />
                    <Route path="/test/animated-text-demo" element={<AnimatedTextDemo />} />
                    <Route path="/test/parallax-card" element={<ParallaxCardTest />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </MainLayout>
              } />
            </Routes>
          </>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App
