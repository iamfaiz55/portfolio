import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy-loaded public components
const Navbar = lazy(() => import("./components/Navbar"));
const HeroSection = lazy(() => import("./components/HeroSection"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Services = lazy(() => import("./components/Services"));
const ContactForm = lazy(() => import("./components/ContactForm"));
const Footer = lazy(() => import("./components/Footer"));
const Details = lazy(() => import("./components/Details"));

// Lazy-loaded admin components
const AdminNavbar = lazy(() => import("./admin/AdminNavbar"));
const AllProjects = lazy(() => import("./admin/AllProjects"));
const AddProject = lazy(() => import("./admin/AddProject"));
const Conatacts = lazy(() => import("./admin/Conatacts"));
const Login = lazy(() => import("./admin/Login"));
const Dashboard = lazy(() => import("./admin/Dashboard"));

// Other components
import Protected from "./components/Protected";

const MainLayout = () => (
  <>
    <Navbar />
    <HeroSection />
    <Skills />
    <Projects />
    <Services />
    <ContactForm />
    <Footer />
  </>
);

const AdminLayout = () => (
  <>
    <AdminNavbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="projects" element={<AllProjects />} />
      <Route path="add-project" element={<AddProject />} />
      <Route path="update-project/:id" element={<AddProject />} />
      <Route path="contacts" element={<Conatacts />} />
    </Routes>
  </>
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />} />
          <Route path="/project-details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />

          {/* Admin protected routes */}
          <Route
            path="/admin/*"
            element={<Protected compo={<AdminLayout />} />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
