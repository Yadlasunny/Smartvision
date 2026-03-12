import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaUsers, FaFileInvoiceDollar, FaChartLine } from "react-icons/fa";

const services = [
  {
    icon: FaUsers,
    title: "Recruitment",
    color: "#2EE6D6",
    description:
      "End-to-end talent acquisition for all industries. We source, screen, and place the right candidates quickly — from freshers to senior executives.",
    features: ["Job profiling & sourcing", "Technical screening", "Interview coordination", "Offer negotiation"],
  },
  {
    icon: FaFileInvoiceDollar,
    title: "Payroll",
    color: "#F5B400",
    description:
      "Accurate, compliant payroll processing so you can focus on growing your business. We handle everything from salary computation to tax filings.",
    features: ["Monthly payroll processing", "PF / ESI compliance", "TDS calculations", "Payslip generation"],
  },
  {
    icon: FaChartLine,
    title: "Business Planning",
    color: "#2EE6D6",
    description:
      "Strategic HR consulting and workforce planning to align your people strategy with your business goals and drive sustainable growth.",
    features: ["Workforce planning", "HR policy drafting", "Org design consulting", "Compliance advisory"],
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl glass border border-white/10 p-8 overflow-hidden cursor-default card-glow card-glow-hover transition-all duration-300"
              >
                {/* Top glow accent */}
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: svc.color }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${svc.color}18`, border: `1.5px solid ${svc.color}30` }}
                >
                  <Icon size={24} style={{ color: svc.color }} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{svc.description}</p>

                {/* Feature list */}
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: svc.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Bottom border accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, transparent, ${svc.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
