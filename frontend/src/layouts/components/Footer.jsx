import React from "react";
import { useTheme } from "@/context/ThemeStore"; // same as in Navbar

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-10 px-6 ${
        theme === "light"
          ? "bg-gray-100 text-gray-800"
          : "bg-gray-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-2">SmartHealth</h2>
          <p
            className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Empowering institutions and individuals to track, manage, and
            improve physical wellness through smart analytics and personalized
            health insights.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul
            className={`space-y-2 text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            <li>
              <a href="#" className="hover:text-blue-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-400">Email: support@smarthealth.com</p>
          <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>
          <p className="text-sm text-gray-400">Bangalore, India</p>
        </div>

        {/* Newsletter or Feedback */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div
        className={`text-center text-sm mt-10 ${
          theme === "light" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        © {new Date().getFullYear()} SmartHealth Monitoring System. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
