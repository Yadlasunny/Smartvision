import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import JobOpenings from "./components/JobOpenings";
import WhyChooseUs from "./components/WhyChooseUs";
import SubmitResume from "./components/SubmitResume";
import Employers from "./components/Employers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import FloatingAdmin from "./components/FloatingAdmin";

function MainSite() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] font-sans">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <JobOpenings />
        <WhyChooseUs />
        <SubmitResume />
        <Employers />
        <Contact />
      </main>
      <Footer />
      <FloatingAdmin />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
