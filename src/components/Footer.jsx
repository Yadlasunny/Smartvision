import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaLock } from "react-icons/fa";

const quickLinks = [
  { label: "Home", to: "home" },
  { label: "Job Openings", to: "jobs" },
  { label: "Our Services", to: "services" },
  { label: "For Employers", to: "employers" },
  { label: "About Us", to: "about" },
  { label: "Contact", to: "contact" },
];

const servicesLinks = [
  "Recruitment",
  "Payroll Processing",
  "Business Planning",
  "Executive Search",
  "HR Consulting",
  "Campus Hiring",
];

const socials = [
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0077b5" },
  { icon: FaInstagram, href: "https://www.instagram.com/smart_vision_jobs?igsh=djU2bTlydnB4bnd0", label: "Instagram", color: "#e1306c" },
  { icon: FaWhatsapp, href: "https://wa.me/917893926574?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20HR%20services.", label: "WhatsApp", color: "#25d366" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2EE6D6] to-[#F5B400] flex items-center justify-center font-black text-black text-sm">
                SV
              </div>
              <div>
                <span className="font-bold text-white text-sm leading-none block">Smart Vision</span>
                <span className="text-[10px] text-[#2EE6D6] tracking-widest uppercase">HR Solutions</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Connecting talented professionals with top employers across India. Your career
              growth and business success are our top priority.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    style={{ "--hover-color": s.color }}
                  >
                    <Icon size={17} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    offset={-80}
                    className="text-gray-500 hover:text-[#2EE6D6] text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {servicesLinks.map((s) => (
                <li key={s}>
                  <span className="text-gray-500 hover:text-[#F5B400] text-sm transition-colors cursor-pointer">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Contact Us</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Phone</p>
                <a href="tel:+917893926574" className="text-sm text-gray-400 hover:text-[#2EE6D6] transition-colors">
                  +91 78939 26574
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:smartvisionhrsolutions@gmail.com" className="text-sm text-gray-400 hover:text-[#2EE6D6] transition-colors">
                  smartvisionhrsolutions@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Office</p>
                <a
                  href="https://maps.google.com/?q=KT+Mansion+3-6-645+Himayatnagar+Hyderabad+500029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-[#2EE6D6] transition-colors leading-relaxed"
                >
                  First Floor, K T Mansion, 3-6-645,<br />
                  Street No. 1, Himayatnagar,<br />
                  Hyderabad – 500029, Telangana
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#2EE6D6]/40 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 rounded-xl bg-[#2EE6D6] text-black text-xs font-bold hover:bg-[#1bc9b9] transition-colors"
                >
                  Go
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Smart Vision HR Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-xs hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-gray-700">·</span>
            <span className="text-gray-600 text-xs hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-gray-700">·</span>
            <span className="text-gray-600 text-xs">
              Built with{" "}
              <span className="text-[#2EE6D6]">♥</span>
            </span>
            <span className="text-gray-700">·</span>
            <RouterLink
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#2EE6D6] transition-colors"
            >
              <FaLock size={9} />
              Admin
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
