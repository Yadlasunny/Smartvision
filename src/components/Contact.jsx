import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const contactInfo = [
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 78939 26574",
    href: "tel:+917893926574",
    external: false,
    color: "#2EE6D6",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "smartvisionhrsolutions@gmail.com",
    href: "mailto:smartvisionhrsolutions@gmail.com",
    external: true,
    color: "#F5B400",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Office",
    value: "First Floor, K T Mansion, 3-6-645, Street No. 1, Himayatnagar, Hyderabad – 500029",
    href: "https://www.google.com/maps/search/?api=1&query=Smart+Vision+HR+Solutions+Himayatnagar+Hyderabad",
    external: true,
    color: "#2EE6D6",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="bg-[#111111] section-pad">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-[#F5B400] mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Let's{" "}
            <span className="bg-gradient-to-r from-[#2EE6D6] to-teal-300 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Whether you're a job seeker or an employer, we're just a message away. Reach out
            and we'll respond within one business day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact cards */}
          <div className="space-y-4">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-5 p-6 rounded-2xl glass border border-white/10 card-glow-hover transition-all duration-300 group cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1.5px solid ${item.color}30` }}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className={`font-medium transition-colors ${item.href !== "#" ? "text-[#2EE6D6] group-hover:underline" : "text-white group-hover:text-[#2EE6D6]"}`}>
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/917893926574?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20HR%20services."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] font-bold hover:bg-[#25d366] hover:text-black transition-all duration-300 mt-6"
            >
              <FaWhatsapp size={22} />
              Chat on WhatsApp
            </motion.a>
          </div>

          {/* Map / visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl glass border border-white/10 overflow-hidden min-h-[360px] relative flex items-center justify-center"
          >
            {/* Decorative map placeholder */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(rgba(46,230,214,1) 1px,transparent 1px),linear-gradient(90deg,rgba(46,230,214,1) 1px,transparent 1px)",
              backgroundSize: "30px 30px",
            }} />
            <div className="relative z-10 text-center p-8">
              <div className="w-16 h-16 rounded-full bg-[#2EE6D6]/10 border border-[#2EE6D6]/30 flex items-center justify-center mx-auto mb-5">
                <FaMapMarkerAlt size={28} className="text-[#2EE6D6]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Vision HR Solutions</h3>
              <p className="text-gray-400 text-sm mb-1">First Floor, K T Mansion, 3-6-645,</p>
              <p className="text-gray-400 text-sm mb-1">Street No. 1, Himayatnagar,</p>
              <p className="text-gray-400 text-sm mb-6">Hyderabad – 500029, Telangana</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Smart+Vision+HR+Solutions+Himayatnagar+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2EE6D6] hover:underline"
              >
                View on Google Maps →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
