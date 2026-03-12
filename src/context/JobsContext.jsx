import { createContext, useContext, useState } from "react";

const defaultJobs = [
  {
    id: 1,
    title: "HR Executive",
    company: "Leading MNC",
    location: "Bangalore",
    experience: "1–3 Years",
    type: "Full Time",
    badge: "Hot",
    badgeColor: "#F5B400",
  },
  {
    id: 2,
    title: "Customer Support Executive",
    company: "IT Services Firm",
    location: "Hyderabad",
    experience: "0–2 Years",
    type: "Full Time",
    badge: "Fresher OK",
    badgeColor: "#2EE6D6",
  },
  {
    id: 3,
    title: "Software Developer",
    company: "Product Startup",
    location: "Pune",
    experience: "2–5 Years",
    type: "Full Time",
    badge: "Urgent",
    badgeColor: "#f87171",
  },
  {
    id: 4,
    title: "Sales Manager",
    company: "Finance Corp",
    location: "Mumbai",
    experience: "3–6 Years",
    type: "Full Time",
    badge: "New",
    badgeColor: "#2EE6D6",
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "Analytics Company",
    location: "Chennai",
    experience: "1–4 Years",
    type: "Full Time",
    badge: "Hot",
    badgeColor: "#F5B400",
  },
  {
    id: 6,
    title: "Operations Executive",
    company: "Logistics Co",
    location: "Delhi NCR",
    experience: "0–3 Years",
    type: "Full Time",
    badge: "Fresher OK",
    badgeColor: "#2EE6D6",
  },
];

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(defaultJobs);

  const addJob = (job) =>
    setJobs((prev) => [...prev, { ...job, id: Date.now() }]);

  const updateJob = (id, updated) =>
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...updated } : j)));

  const deleteJob = (id) =>
    setJobs((prev) => prev.filter((j) => j.id !== id));

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => useContext(JobsContext);
