import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaBriefcase,
  FaMapMarkerAlt, FaTimes, FaCheck, FaSearch, FaEye,
} from "react-icons/fa";
import { useJobs } from "../context/JobsContext";

const BADGE_OPTIONS = [
  { label: "Hot", color: "#F5B400" },
  { label: "New", color: "#2EE6D6" },
  { label: "Urgent", color: "#f87171" },
  { label: "Fresher OK", color: "#2EE6D6" },
  { label: "Featured", color: "#a78bfa" },
];

const emptyJob = {
  title: "",
  company: "",
  location: "",
  experience: "",
  type: "Full Time",
  badge: "New",
  badgeColor: "#2EE6D6",
};

function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl overflow-hidden"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <h3 className="font-bold text-white text-base">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <FaTimes size={13} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function JobForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyJob);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBadge = (b) => setForm({ ...form, badge: b.label, badgeColor: b.color });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#2EE6D6]/50 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Job Title *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. HR Executive" required className={inputCls} />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Company *</label>
          <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Tech Corp" required className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Location *</label>
          <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bangalore" required className={inputCls} />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Experience *</label>
          <input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 1–3 Years" required className={inputCls} />
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-1.5 block">Job Type</label>
        <select name="type" value={form.type} onChange={handleChange} className={inputCls + " cursor-pointer"}>
          <option value="Full Time" className="bg-[#111]">Full Time</option>
          <option value="Part Time" className="bg-[#111]">Part Time</option>
          <option value="Contract" className="bg-[#111]">Contract</option>
          <option value="Remote" className="bg-[#111]">Remote</option>
          <option value="Hybrid" className="bg-[#111]">Hybrid</option>
        </select>
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-2 block">Badge</label>
        <div className="flex flex-wrap gap-2">
          {BADGE_OPTIONS.map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={() => handleBadge(b)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: form.badge === b.label ? b.color : `${b.color}18`,
                color: form.badge === b.label ? "#000" : b.color,
                border: `1.5px solid ${b.color}40`,
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 text-sm font-semibold hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 rounded-xl bg-[#2EE6D6] text-black font-bold text-sm hover:bg-[#1bc9b9] transition-all flex items-center justify-center gap-2"
        >
          <FaCheck size={12} />
          Save Job
        </motion.button>
      </div>
    </form>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { jobs, addJob, updateJob, deleteJob } = useJobs();

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // { type: "add" | "edit" | "delete", job?: {} }
  const [toast, setToast] = useState(null);

  // Auth guard
  useEffect(() => {
    if (sessionStorage.getItem("sv_admin_auth") !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const showToast = (msg, color = "#2EE6D6") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sv_admin_auth");
    navigate("/admin");
  };

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (form) => {
    addJob(form);
    setModal(null);
    showToast("Job added successfully!");
  };

  const handleEdit = (form) => {
    updateJob(modal.job.id, form);
    setModal(null);
    showToast("Job updated successfully!");
  };

  const handleDelete = () => {
    deleteJob(modal.job.id);
    setModal(null);
    showToast("Job deleted.", "#f87171");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] font-sans">
      {/* Topbar */}
      <header
        className="sticky top-0 z-40 px-4 sm:px-8 lg:px-12"
        style={{
          background: "rgba(11,11,11,0.85)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2EE6D6] to-[#F5B400] flex items-center justify-center font-black text-black text-xs">
              SV
            </div>
            <div>
              <span className="text-white font-bold text-sm">Admin Dashboard</span>
              <span className="hidden sm:inline text-gray-600 text-xs ml-2">— Smart Vision HR</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#2EE6D6] transition-colors font-medium"
            >
              <FaEye size={11} />
              View Site
            </a>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 border border-white/10 hover:text-red-400 hover:border-red-400/30 transition-all"
            >
              <FaSignOutAlt size={13} />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Jobs", value: jobs.length, color: "#2EE6D6" },
            { label: "Full Time", value: jobs.filter((j) => j.type === "Full Time").length, color: "#F5B400" },
            { label: "Remote / Hybrid", value: jobs.filter((j) => ["Remote", "Hybrid"].includes(j.type)).length, color: "#a78bfa" },
            { label: "Urgent", value: jobs.filter((j) => j.badge === "Urgent").length, color: "#f87171" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-2xl font-black" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <FaSearch
              size={13}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
            />
            <input
              type="text"
              placeholder="Search jobs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#2EE6D6]/40 transition-all"
            />
          </div>
          <motion.button
            onClick={() => setModal({ type: "add" })}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2EE6D6] text-black font-bold text-sm hover:bg-[#1bc9b9] transition-all"
            style={{ boxShadow: "0 0 20px rgba(46,230,214,0.2)" }}
          >
            <FaPlus size={12} />
            Add New Job
          </motion.button>
        </div>

        {/* Jobs table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Thead */}
          <div
            className="grid grid-cols-12 items-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="col-span-4">Job Title</div>
            <div className="col-span-2 hidden sm:block">Location</div>
            <div className="col-span-2 hidden md:block">Experience</div>
            <div className="col-span-2 hidden lg:block">Type</div>
            <div className="col-span-1 hidden sm:block">Badge</div>
            <div className="col-span-2 sm:col-span-1 text-right">Actions</div>
          </div>

          {/* Rows */}
          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-gray-600 text-sm">
                No jobs found.{" "}
                <button onClick={() => setModal({ type: "add" })} className="text-[#2EE6D6] hover:underline">
                  Add one
                </button>
              </div>
            ) : (
              filtered.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-12 items-center px-5 py-4 group hover:bg-white/[0.025] transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  {/* Title + company */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#2EE6D6]/10 border border-[#2EE6D6]/15 flex items-center justify-center flex-shrink-0">
                        <FaBriefcase size={12} className="text-[#2EE6D6]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white leading-snug">{job.title}</p>
                        <p className="text-xs text-gray-600">{job.company}</p>
                      </div>
                    </div>
                  </div>
                  {/* Location */}
                  <div className="col-span-2 hidden sm:flex items-center gap-1.5 text-sm text-gray-400">
                    <FaMapMarkerAlt size={10} className="text-[#2EE6D6]" />
                    {job.location}
                  </div>
                  {/* Experience */}
                  <div className="col-span-2 hidden md:block text-sm text-gray-400">{job.experience}</div>
                  {/* Type */}
                  <div className="col-span-2 hidden lg:block">
                    <span className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  {/* Badge */}
                  <div className="col-span-1 hidden sm:block">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-black"
                      style={{ background: job.badgeColor }}
                    >
                      {job.badge}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-2">
                    <motion.button
                      onClick={() => setModal({ type: "edit", job })}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit"
                      className="w-7 h-7 rounded-lg bg-[#F5B400]/10 border border-[#F5B400]/20 flex items-center justify-center text-[#F5B400] hover:bg-[#F5B400]/20 transition-all"
                    >
                      <FaEdit size={11} />
                    </motion.button>
                    <motion.button
                      onClick={() => setModal({ type: "delete", job })}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete"
                      className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <FaTrash size={11} />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <p className="text-xs text-gray-700 mt-4 text-right">
          Showing {filtered.length} of {jobs.length} jobs
        </p>
      </main>

      {/* Add modal */}
      <Modal
        open={modal?.type === "add"}
        onClose={() => setModal(null)}
        title="Add New Job"
      >
        <JobForm onSave={handleAdd} onCancel={() => setModal(null)} />
      </Modal>

      {/* Edit modal */}
      <Modal
        open={modal?.type === "edit"}
        onClose={() => setModal(null)}
        title="Edit Job"
      >
        {modal?.job && (
          <JobForm
            initial={modal.job}
            onSave={handleEdit}
            onCancel={() => setModal(null)}
          />
        )}
      </Modal>

      {/* Delete confirm modal */}
      <Modal
        open={modal?.type === "delete"}
        onClose={() => setModal(null)}
        title="Delete Job"
      >
        <p className="text-gray-400 text-sm mb-6">
          Are you sure you want to delete{" "}
          <span className="text-white font-semibold">{modal?.job?.title}</span> at{" "}
          <span className="text-white font-semibold">{modal?.job?.company}</span>? This
          action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setModal(null)}
            className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 text-sm font-semibold hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleDelete}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all flex items-center justify-center gap-2"
          >
            <FaTrash size={12} />
            Delete
          </motion.button>
        </div>
      </Modal>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl text-sm font-semibold text-black flex items-center gap-2 shadow-xl"
            style={{ background: toast.color }}
          >
            <FaCheck size={12} />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
