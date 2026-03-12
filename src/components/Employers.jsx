import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaBuilding, FaHandshake, FaCog, FaUsers } from "react-icons/fa";

const benefits = [
  {
    icon: FaUsers,
    title: "Pre-screened Talent Pool",
    description: "Access thousands of verified, pre-screened candidates ready to join. We shortlist only the best matches for your requirements.",
  },
  {
    icon: FaCog,
    title: "Custom Hiring Solutions",
    description: "Bulk hiring, niche talent acquisition, or executive search — we tailor our approach to your specific hiring challenges.",
  },
  {
    icon: FaHandshake,
    title: "Dedicated Account Manager",
    description: "A dedicated relationship manager handles your account end-to-end, ensuring smooth communication and fast resolution.",
  },
  {
    icon: FaBuilding,
    title: "Replacement Guarantee",
    description: "We stand behind our placements. If a candidate doesn't work out within 90 days, we replace them at no additional cost.",
  },
];

export default function Employers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="employers" className="bg-[#0B0B0B] section-pad">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-[#2EE6D6] mb-3 block">
            For Hiring Companies
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Hire{" "}
            <span className="bg-gradient-to-r from-[#2EE6D6] to-teal-300 bg-clip-text text-transparent">
              Smarter
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-[#F5B400] to-orange-400 bg-clip-text text-transparent">
              Faster
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you're scaling a team, replacing a critical role, or building a department
            from scratch — Smart Vision HR is your end-to-end recruitment partner.
          </p>
        </motion.div>

        {/* Employer benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl glass border border-white/10 p-6 text-center card-glow-hover transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2EE6D6]/10 border border-[#2EE6D6]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-[#2EE6D6]" />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{b.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{b.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(46,230,214,0.08) 0%, rgba(245,180,0,0.06) 100%)",
            border: "1px solid rgba(46,230,214,0.15)",
          }}
        >
          {/* Glow blobs */}
          <div className="absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-[#2EE6D6]/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-[#F5B400]/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              Ready to Build Your Dream Team?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Tell us your requirements and we'll get your positions filled within 7 working days.
              No placement, no fee.
            </p>
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-2xl bg-[#2EE6D6] text-black font-bold text-base btn-glow hover:bg-[#1bc9b9] transition-all duration-200"
            >
              Request Hiring Support →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
