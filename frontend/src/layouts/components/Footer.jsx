import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeStore";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import AppLogo from "@/components/AppLogo";

export default function Footer() {
  const { theme } = useTheme();

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const links = [
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: "support@smarthealth.com" },
    { icon: <Phone className="w-4 h-4" />, text: "+91 98765 43210" },
    { icon: <MapPin className="w-4 h-4" />, text: "Bangalore, India" },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={footerVariants}
      className={`py-16 px-6 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800"
          : "bg-gradient-to-b from-gray-900 to-gray-950 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <AppLogo />
            <motion.p
              variants={itemVariants}
              className={`text-sm ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              Empowering institutions and individuals to track, manage, and
              improve physical wellness through smart analytics and personalized
              health insights.
            </motion.p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className={`flex items-center text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-300"
                    } hover:text-blue-500 transition-colors`}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <span className="mr-3 mt-0.5 text-blue-500">{info.icon}</span>
                  <span
                    className={`text-sm ${
                      theme === "light" ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    {info.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <motion.form className="space-y-4" whileHover={{ scale: 1.01 }}>
              <motion.input
                type="email"
                placeholder="Your email"
                whileFocus={{ scale: 1.02 }}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                  theme === "light"
                    ? "bg-white text-gray-800 focus:ring-blue-500"
                    : "bg-gray-800 text-white focus:ring-blue-400"
                }`}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className={`h-px my-12 ${
            theme === "light" ? "bg-gray-200" : "bg-gray-800"
          }`}
        />

        {/* Bottom Line */}
        <motion.div
          variants={itemVariants}
          className={`text-center text-sm ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          © {new Date().getFullYear()} SmartHealth Monitoring System. All
          rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
}
