import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaBolt, FaShieldAlt, FaStar, FaNetworkWired } from "react-icons/fa";

const reasons = [
  {
    icon: FaBolt,
    title: "Fast Hiring Process",
    description:
      "Our streamlined recruitment pipeline ensures positions are filled in record time without compromising on quality.",
    color: "#F5B400",
  },
  {
    icon: FaShieldAlt,
    title: "Trusted Recruiters",
    description:
      "10+ years of experience with a proven track record. We work with integrity and transparency at every step.",
    color: "#2EE6D6",
  },
  {
    icon: FaStar,
    title: "Opportunities for Freshers",
    description:
      "We don't just place experienced professionals — we actively help freshers launch their careers with top companies.",
    color: "#F5B400",
  },
  {
    icon: FaNetworkWired,
    title: "Strong Industry Network",
    description:
      "Deep relationships with 300+ hiring companies across IT, BFSI, healthcare, retail, and manufacturing sectors.",
    color: "#2EE6D6",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="bg-[#0B0B0B] section-pad">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-[#2EE6D6] mb-3 block">
              Why Smart Vision
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              The HR Partner{" "}
              <span className="bg-gradient-to-r from-[#2EE6D6] to-teal-300 bg-clip-text text-transparent">
                You Can Count On
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We combine technology-driven sourcing with a human-first approach to deliver
              recruitment solutions that genuinely work. From startups to large enterprises,
              we've built enduring partnerships based on results.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {["ISO Certified", "NASSCOM Member", "10+ Years Experience", "Pan India"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-4 py-2 rounded-full glass border border-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: benefit cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group rounded-2xl glass border border-white/10 p-6 card-glow-hover transition-all duration-300 cursor-default"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${r.color}15`, border: `1.5px solid ${r.color}30` }}
                  >
                    <Icon size={18} style={{ color: r.color }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{r.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
