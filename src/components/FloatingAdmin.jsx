import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaTimes } from "react-icons/fa";

export default function FloatingAdmin() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip card */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="admin-card"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-2xl overflow-hidden text-sm"
            style={{
              background: "#111111",
              border: "1px solid rgba(46,230,214,0.2)",
              boxShadow: "0 0 30px rgba(46,230,214,0.12)",
              minWidth: "170px",
            }}
          >
            <div className="px-4 py-3 border-b border-white/8">
              <p className="text-xs font-semibold text-[#2EE6D6] tracking-wide uppercase">Admin Portal</p>
              <p className="text-xs text-gray-600 mt-0.5">Manage job listings</p>
            </div>
            <div className="p-3">
              <Link
                to="/admin"
                onClick={() => setExpanded(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#2EE6D6] text-black font-bold text-xs hover:bg-[#1bc9b9] transition-all"
                style={{ boxShadow: "0 0 16px rgba(46,230,214,0.25)" }}
              >
                <FaLock size={10} />
                Go to Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        title="Admin Portal"
        className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold transition-all"
        style={{
          background: expanded
            ? "rgba(255,255,255,0.1)"
            : "linear-gradient(135deg, #2EE6D6, #1bc9b9)",
          border: expanded ? "1.5px solid rgba(46,230,214,0.4)" : "none",
          boxShadow: expanded ? "none" : "0 0 20px rgba(46,230,214,0.35)",
        }}
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaTimes size={16} className="text-[#2EE6D6]" />
            </motion.span>
          ) : (
            <motion.span
              key="lock"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaLock size={15} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
