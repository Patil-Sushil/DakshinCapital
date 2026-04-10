// App Routes Configuration
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PageLoader } from '../components/common/Loader';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../components/admin/layout/AdminLayout';

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/public/Home'));
const About = lazy(() => import('../pages/public/About'));
const Services = lazy(() => import('../pages/public/Services'));
const Projects = lazy(() => import('../pages/public/Projects'));
const ProjectDetails = lazy(() => import('../pages/public/ProjectDetails'));
const Gallery = lazy(() => import('../pages/public/Gallery'));
const EMICalculatorPage = lazy(() => import('../pages/public/EMICalculator'));
const Contact = lazy(() => import('../pages/public/Contact'));
const PrivacyPolicy = lazy(() => import('../pages/public/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/public/Terms'));
const NotFound = lazy(() => import('../pages/public/NotFound'));

// Admin pages
const Login = lazy(() => import('../pages/admin/Login'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const EnquiriesPage = lazy(() => import('../pages/admin/EnquiriesPage'));
const ProjectsPage = lazy(() => import('../pages/admin/ProjectsPage'));
const GalleryPage = lazy(() => import('../pages/admin/GalleryPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetails />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/emi-calculator" element={<EMICalculatorPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Admin Login (No Layout) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes (Protected with Layout) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="enquiries" element={<EnquiriesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route
            path="settings"
            element={
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">Coming soon</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
