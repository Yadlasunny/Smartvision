import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FaUsers,
  FaFileInvoiceDollar,
  FaChartLine,
  FaUserTie,
  FaClipboardCheck,
  FaUniversity,
} from "react-icons/fa";

const services = [
  {
    icon: FaUsers,
    title: "Recruitment",
    color: "#2EE6D6",
    description:
      "We help companies hire qualified candidates quickly by sourcing, screening, and shortlisting talent for various roles across industries.",
    features: ["Talent sourcing", "Profile screening", "Shortlisting support", "Interview pipeline management"],
  },
  {
    icon: FaFileInvoiceDollar,
    title: "Payroll Processing",
    color: "#F5B400",
    description:
      "We manage employee salary processing, tax deductions, compliance, and payroll reports to help companies focus on their core business.",
    features: ["Salary processing", "Tax and statutory deductions", "Compliance handling", "Payroll reporting"],
  },
  {
    icon: FaChartLine,
    title: "Business Planning",
    color: "#2EE6D6",
    description:
      "We support organizations with strategic HR planning, workforce planning, and growth strategies to improve operational efficiency.",
    features: ["Strategic HR planning", "Workforce planning", "Growth strategy support", "Operational alignment"],
  },
  {
    icon: FaUserTie,
    title: "Executive Search",
    color: "#F5B400",
    description:
      "We specialize in identifying and recruiting senior-level executives and leadership talent for organizations.",
    features: ["Leadership mapping", "Confidential hiring", "Senior talent outreach", "Executive assessment"],
  },
  {
    icon: FaClipboardCheck,
    title: "HR Consulting",
    color: "#2EE6D6",
    description:
      "We provide expert HR advice including HR policies, performance management systems, compliance guidance, and workforce optimization.",
    features: ["Policy frameworks", "Performance systems", "Compliance guidance", "Workforce optimization"],
  },
  {
    icon: FaUniversity,
    title: "Campus Hiring",
    color: "#F5B400",
    description:
      "We help companies recruit fresh graduates by organizing campus recruitment drives and internship hiring programs.",
    features: ["Campus drives", "Graduate recruitment", "Internship hiring", "Pre-placement coordination"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section id="services" className="bg-[#0B0B0B] section-pad">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-[#2EE6D6] mb-3 block">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Our Core{" "}
            <span className="bg-gradient-to-r from-[#2EE6D6] to-teal-300 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            Comprehensive HR solutions tailored to meet the needs of modern businesses and
            job seekers across India.
          </p>
        </motion.div>

        {/* Service buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const isActive = activeService.title === svc.title;

            return (
              <motion.button
                key={svc.title}
                type="button"
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveService(svc)}
                className={`rounded-2xl px-4 py-4 text-left border transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 border-white/25 shadow-lg"
                    : "glass border-white/10 hover:border-white/20"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}
                >
                  <Icon size={18} style={{ color: svc.color }} />
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{svc.title}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic service content */}
        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group relative rounded-3xl glass border border-white/10 p-6 md:p-8 overflow-hidden card-glow"
            >
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] opacity-30"
                style={{ background: activeService.color }}
              />

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: `${activeService.color}18`,
                  border: `1.5px solid ${activeService.color}30`,
                }}
              >
                <activeService.icon size={24} style={{ color: activeService.color }} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{activeService.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
                {activeService.description}
              </p>

              <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-3">
                Service Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeService.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-200">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: activeService.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
