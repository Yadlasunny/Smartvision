import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaArrowRight } from "react-icons/fa";
import { useJobs } from "../context/JobsContext";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function JobOpenings() {
  const { jobs } = useJobs();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const visibleJobs = showAll ? jobs : jobs.slice(0, 3);

  return (
    <section id="jobs" className="bg-[#111111] section-pad">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-[#F5B400] mb-3 block">
            Latest Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Open{" "}
            <span className="bg-gradient-to-r from-[#F5B400] to-orange-400 bg-clip-text text-transparent">
              Job Positions
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore exciting career opportunities across top companies in India. New roles
            added every week.
          </p>
        </motion.div>

        {/* Jobs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
          {visibleJobs.map((job, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative rounded-2xl glass border border-white/10 p-6 overflow-hidden card-glow-hover transition-all duration-300 cursor-default"
            >
              {/* Badge */}
              <span
                className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full text-black"
                style={{ background: job.badgeColor }}
              >
                {job.badge}
              </span>

              {/* Job icon */}
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                <FaBriefcase size={18} className="text-[#2EE6D6]" />
              </div>

              {/* Title & company */}
              <h3 className="text-lg font-bold text-white mb-1">{job.title}</h3>
              <p className="text-gray-500 text-sm mb-5">{job.company}</p>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 rounded-full px-3 py-1.5">
                  <FaMapMarkerAlt size={10} className="text-[#2EE6D6]" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 rounded-full px-3 py-1.5">
                  <FaBriefcase size={10} className="text-[#F5B400]" />
                  {job.experience}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 rounded-full px-3 py-1.5">
                  {job.type}
                </span>
              </div>

              {/* Apply button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#2EE6D6]/30 text-[#2EE6D6] text-sm font-semibold group-hover:bg-[#2EE6D6] group-hover:text-black group-hover:border-[#2EE6D6] transition-all duration-300"
              >
                Apply Now
                <FaArrowRight size={12} />
              </motion.button>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

        {/* View all button */}
        {jobs.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full border border-[#F5B400]/40 text-[#F5B400] font-semibold hover:bg-[#F5B400] hover:text-black transition-all duration-300 btn-glow-yellow"
          >
            {showAll ? "Show Less ↑" : "View All Openings →"}
          </motion.button>
        </motion.div>
        )}
      </div>
    </section>
  );
}
