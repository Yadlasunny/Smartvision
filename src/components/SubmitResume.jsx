import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaUpload, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// ─── Web3Forms access key ───────────────────────────────────────────────────
// Get your FREE key at https://web3forms.com/ using smartvisionhrsolutions@gmail.com
const WEB3FORMS_KEY = "e61245cf-898f-420b-b612-5234ecdffd31";
// ────────────────────────────────────────────────────────────────────────────

const inputClass =
  "w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2EE6D6]/60 focus:bg-white/8 transition-all duration-200 text-sm";

const labelClass = "block text-sm font-medium text-gray-300 mb-2";

export default function SubmitResume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", experience: "", location: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("access_key", WEB3FORMS_KEY);
      data.append("subject", `New Resume Submission – ${form.name} (${form.experience} exp)`);
      data.append("from_name", "Smart Vision HR – Resume Form");
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("experience", form.experience);
      data.append("preferred_location", form.location);

      const file = fileInputRef.current?.files[0];
      if (file) data.append("resume", file);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="resume" className="bg-[#111111] section-pad">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-[#F5B400] mb-3 block">
              Get Hired Faster
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Submit Your{" "}
              <span className="bg-gradient-to-r from-[#F5B400] to-orange-400 bg-clip-text text-transparent">
                Resume
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Share your profile with us and we'll match you with the best opportunities
              suited to your skills and experience. Our recruiters will reach out within
              24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: "01", text: "Fill in your details and upload your resume" },
                { icon: "02", text: "Our team reviews your profile within 24 hours" },
                { icon: "03", text: "Get matched with relevant job opportunities" },
                { icon: "04", text: "Attend interviews and land your dream job" },
              ].map((step) => (
                <div key={step.icon} className="flex items-start gap-4">
                  <span className="text-xs font-black text-[#2EE6D6] mt-0.5 w-6 flex-shrink-0">
                    {step.icon}
                  </span>
                  <span className="text-gray-300 text-sm leading-relaxed">{step.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl glass border border-white/10 p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 12345 67890"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Years of Experience *</label>
                    <select
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      required
                      className={inputClass + " cursor-pointer"}
                    >
                      <option value="" className="bg-[#111111]">Select experience</option>
                      <option value="0" className="bg-[#111111]">Fresher (0 years)</option>
                      <option value="1-2" className="bg-[#111111]">1–2 years</option>
                      <option value="3-5" className="bg-[#111111]">3–5 years</option>
                      <option value="5-8" className="bg-[#111111]">5–8 years</option>
                      <option value="8+" className="bg-[#111111]">8+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Preferred Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Bangalore, Hyderabad, Remote"
                    required
                    className={inputClass}
                  />
                </div>

                {/* File upload */}
                <div>
                  <label className={labelClass}>Upload Resume *</label>
                  <label className="relative block w-full cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      ref={fileInputRef}
                      onChange={handleFile}
                      required
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-dashed transition-all duration-200 ${
                        fileName
                          ? "border-[#2EE6D6]/60 bg-[#2EE6D6]/5"
                          : "border-white/10 hover:border-[#2EE6D6]/30"
                      }`}
                    >
                      <FaUpload size={16} className={fileName ? "text-[#2EE6D6]" : "text-gray-500"} />
                      <span className={`text-sm ${fileName ? "text-[#2EE6D6]" : "text-gray-500"}`}>
                        {fileName || "Click to upload PDF / DOC (max 5MB)"}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm"
                  >
                    <FaExclamationCircle size={14} className="flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-4 rounded-xl bg-[#2EE6D6] text-black font-bold text-base hover:bg-[#1bc9b9] transition-all duration-200 btn-glow mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting…
                    </span>
                  ) : (
                    "Submit Resume →"
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl glass border border-[#2EE6D6]/30 p-12 text-center"
              >
                <FaCheckCircle size={56} className="text-[#2EE6D6] mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-white mb-3">Resume Submitted!</h3>
                <p className="text-gray-400">
                  Thank you! Our team will review your profile and reach out within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
