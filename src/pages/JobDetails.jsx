import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUpload,
} from "react-icons/fa";
import { useJobs } from "../context/JobsContext";

const sectionAnim = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#2EE6D6]/45 transition-all";

const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GAS_WEBAPP_URL || "";

function buildJobDetails(job) {
  const description =
    job.description ||
    `SMART VISION HR SOLUTIONS is hiring a ${job.title} for ${job.company}. This role focuses on operational excellence, communication, and delivering measurable outcomes for business teams.`;

  const requirements = job.requirements || [
    `Relevant experience in a similar ${job.title} role (${job.experience}).`,
    "Strong communication and stakeholder coordination skills.",
    "Ability to work in a fast-paced and target-driven environment.",
    "Basic proficiency in digital tools and reporting workflows.",
  ];

  const benefits = job.benefits || [
    "Competitive compensation aligned with industry benchmarks.",
    "Career growth opportunities with structured support.",
    "Collaborative work culture and learning exposure.",
    `Location advantage in ${job.location} with hybrid opportunities where applicable.`,
  ];

  return { description, requirements, benefits };
}

export default function JobDetails() {
  const { jobs, activeJobs } = useJobs();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentCity: "",
    totalExperience: "",
    currentCompany: "",
    currentSalary: "",
    expectedSalary: "",
    message: "",
  });

  const job = useMemo(
    () => activeJobs.find((item) => String(item.id) === String(jobId)),
    [activeJobs, jobId]
  );

  const inactiveJob = useMemo(
    () => jobs.find((item) => String(item.id) === String(jobId)),
    [jobs, jobId]
  );

  const handleChange = (e) => {
    if (submitError) setSubmitError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResume = (e) => {
    const file = e.target.files?.[0];
    setResumeFileName(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!GOOGLE_APPS_SCRIPT_URL) {
      setSubmitError("Application endpoint is not configured. Please contact support.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload = new URLSearchParams({
      date: new Date().toISOString(),
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      city: form.currentCity,
      experience: form.totalExperience,
      currentCompany: form.currentCompany,
      currentSalary: form.currentSalary,
      expectedSalary: form.expectedSalary,
      message: form.message,
      jobTitle: job.title,
      jobCompany: job.company,
      resumeFileName,
    });

    // Apps Script CORS responses are often opaque in browsers.
    // no-cors still sends data to the endpoint reliably.
    fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: payload.toString(),
    })
      .then(() => {
        setSubmitted(true);
        setShowForm(false);
        setForm({
          fullName: "",
          email: "",
          phone: "",
          currentCity: "",
          totalExperience: "",
          currentCompany: "",
          currentSalary: "",
          expectedSalary: "",
          message: "",
        });
        setResumeFileName("");
        window.alert("Application Submitted Successfully");
      })
      .catch(() => {
        setSubmitError("Could not submit your application. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!job && inactiveJob) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white px-4 py-16 sm:px-8">
        <div className="max-w-3xl mx-auto rounded-3xl glass border border-white/10 p-8 sm:p-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-black mb-3">Job Listing Expired</h1>
          <p className="text-gray-400 mb-8">
            This job posting is no longer active on SMART VISION HR SOLUTIONS.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2EE6D6] text-black font-bold hover:bg-[#1bc9b9] transition-colors"
          >
            <FaArrowLeft size={12} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white px-4 py-16 sm:px-8">
        <div className="max-w-3xl mx-auto rounded-3xl glass border border-white/10 p-8 sm:p-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-black mb-3">Job Not Found</h1>
          <p className="text-gray-400 mb-8">
            We could not find this job posting. It may have been removed or the link may be invalid.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2EE6D6] text-black font-bold hover:bg-[#1bc9b9] transition-colors"
          >
            <FaArrowLeft size={12} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const details = buildJobDetails(job);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-10">
        <motion.button
          type="button"
          onClick={() => navigate("/")}
          whileHover={{ x: -2 }}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#2EE6D6] transition-colors mb-6"
        >
          <FaArrowLeft size={11} />
          Back to Open Jobs
        </motion.button>

        <motion.section
          variants={sectionAnim}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45 }}
          className="rounded-3xl glass border border-white/10 p-6 sm:p-8 lg:p-10 mb-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">{job.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <FaBuilding size={11} className="text-[#2EE6D6]" />
                  {job.company}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FaMapMarkerAlt size={11} className="text-[#2EE6D6]" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FaBriefcase size={11} className="text-[#F5B400]" />
                  {job.experience}
                </span>
                <span className="inline-flex items-center rounded-full px-3 py-1 bg-white/5 border border-white/10">
                  {job.type}
                </span>
              </div>
            </div>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full text-black"
              style={{ background: job.badgeColor }}
            >
              {job.badge}
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed">{details.description}</p>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.section
            variants={sectionAnim}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-3xl glass border border-white/10 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Requirements</h2>
            <ul className="space-y-2">
              {details.requirements.map((item) => (
                <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2EE6D6] mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            variants={sectionAnim}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45, delay: 0.14 }}
            className="rounded-3xl glass border border-white/10 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Benefits</h2>
            <ul className="space-y-2">
              {details.benefits.map((item) => (
                <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B400] mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        <AnimatePresence mode="wait">
          {!showForm && !submitted && (
            <motion.div
              key="apply-cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl glass border border-white/10 p-6 sm:p-8 text-center"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-3">Ready to apply?</h2>
              <p className="text-gray-400 mb-6">
                Submit your application for this position at SMART VISION HR SOLUTIONS.
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="px-8 py-3.5 rounded-xl bg-[#2EE6D6] text-black font-bold hover:bg-[#1bc9b9] transition-colors"
              >
                Apply for this Job
              </motion.button>
            </motion.div>
          )}

          {showForm && (
            <motion.section
              key="application-form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl glass border border-white/10 p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Candidate Application Form</h2>

              <form id="jobForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className={inputClass}
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className={inputClass}
                  />
                  <input
                    name="currentCity"
                    value={form.currentCity}
                    onChange={handleChange}
                    placeholder="Current City"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="totalExperience"
                    value={form.totalExperience}
                    onChange={handleChange}
                    placeholder="Total Experience"
                    required
                    className={inputClass}
                  />
                  <input
                    name="currentCompany"
                    value={form.currentCompany}
                    onChange={handleChange}
                    placeholder="Current Company"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="currentSalary"
                    value={form.currentSalary}
                    onChange={handleChange}
                    placeholder="Current Salary"
                    className={inputClass}
                  />
                  <input
                    name="expectedSalary"
                    value={form.expectedSalary}
                    onChange={handleChange}
                    placeholder="Expected Salary"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <label className="text-sm text-gray-300 mb-2 block">Resume Upload</label>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2EE6D6]/30 text-[#2EE6D6] text-sm cursor-pointer hover:bg-[#2EE6D6]/10 transition-colors">
                    <FaUpload size={12} />
                    Upload Resume
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleResume}
                      className="hidden"
                    />
                  </label>
                  {resumeFileName && (
                    <p className="text-xs text-gray-500 mt-2">Selected: {resumeFileName}</p>
                  )}
                </div>

                {submitError && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                    {submitError}
                  </p>
                )}

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message to Recruiter"
                  rows={4}
                  className={inputClass}
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-[#2EE6D6] text-black font-bold hover:bg-[#1bc9b9] transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane size={12} />
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </motion.button>
                </div>
              </form>
            </motion.section>
          )}

          {submitted && !showForm && (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-[#2EE6D6]/30 bg-[#2EE6D6]/10 p-6 sm:p-8 text-center"
            >
              <FaCheckCircle size={28} className="text-[#2EE6D6] mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-2">Application Submitted Successfully</h2>
              <p className="text-gray-300 mb-6">
                Thank you for applying. Our recruitment team will review your profile and get in touch.
              </p>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-xl bg-[#2EE6D6] text-black font-bold hover:bg-[#1bc9b9] transition-colors"
              >
                Browse More Jobs
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
