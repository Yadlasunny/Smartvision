import { motion } from "framer-motion";
import { Link } from "react-scroll";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0B0B]"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#2EE6D6]/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full bg-[#F5B400]/15 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#2EE6D6]/10 blur-[100px]"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(46,230,214,1) 1px,transparent 1px),linear-gradient(90deg,rgba(46,230,214,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              background: i % 2 === 0 ? "#2EE6D6" : "#F5B400",
              left: `${8 + i * 7.5}%`,
              top: `${15 + (i % 5) * 12}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto section-pad w-full pt-32 md:pt-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#2EE6D6] animate-pulse" />
            <span className="text-sm text-[#2EE6D6] font-medium tracking-wide">
              India's Trusted HR Partner
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-white">Connecting</span>
            <br />
            <span className="bg-gradient-to-r from-[#2EE6D6] to-teal-300 bg-clip-text text-transparent">
              Talent
            </span>{" "}
            <span className="text-white">With</span>
            <br />
            <span className="bg-gradient-to-r from-[#F5B400] to-orange-400 bg-clip-text text-transparent">
              Opportunity
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
          >
            Smart Vision HR Solutions bridges the gap between ambitious professionals and
            top companies. We specialize in{" "}
            <span className="text-[#2EE6D6] font-medium">Recruitment</span>,{" "}
            <span className="text-[#F5B400] font-medium">Payroll</span>, and{" "}
            <span className="text-[#2EE6D6] font-medium">Business Planning</span> — helping
            you grow faster, smarter.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-4"
          >
            <Link to="jobs" smooth duration={600} offset={-80}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl bg-[#2EE6D6] text-black font-bold text-base transition-all duration-200 btn-glow hover:bg-[#1bc9b9]"
              >
                View Jobs →
              </motion.button>
            </Link>
            <Link to="resume" smooth duration={600} offset={-80}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl glass text-white font-bold text-base border border-[#2EE6D6]/30 hover:border-[#2EE6D6]/70 transition-all duration-200"
              >
                Submit Resume
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-16 flex flex-wrap gap-8"
          >
            {[
              { value: "5000+", label: "Placements Done" },
              { value: "300+", label: "Partner Companies" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#2EE6D6] to-teal-300 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
      >
        <div className="w-0.5 h-8 bg-gradient-to-b from-transparent to-[#2EE6D6]/50 rounded-full" />
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
