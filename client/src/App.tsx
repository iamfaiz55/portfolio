import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
// import Projects from "./pages/Projects";
// import Navbar from "./components/Navbar";

const App = () => {
  return (
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
};

export default App;
