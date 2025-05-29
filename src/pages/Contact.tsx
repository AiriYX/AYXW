import React from "react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Contact = () => {
  const { theme } = useTheme();

  const socialLinks = [
    {
      name: "Email",
      icon: <Mail size={24} />,
      url: "mailto:airiweng@gmail.com",
      username: "airiweng@gmail.com",
      color: "hover:text-blue-500",
    },
    {
      name: "GitHub",
      icon: <Github size={24} />,
      url: "https://github.com/airiYX",
      username: "@airiYX",
      color: "hover:text-gray-600",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      url: "https://linkedin.com/in/airi-weng",
      username: "/in/airiweng",
      color: "hover:text-blue-600",
    },
    // {
    //   name: "Twitter",
    //   icon: <Twitter size={24} />,
    //   url: "https://twitter.com/alexchen_dev",
    //   username: "@alexchen_dev",
    //   color: "hover:text-blue-400",
    // },
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="animate-fade-in">
          <h1
            className={`text-4xl md:text-5xl font-serif font-bold mb-4 text-center ${
              theme === "dark" ? "text-neutral-100" : "text-neutral-700"
            }`}
          >
            Let's{" "}
            <span
              className={theme === "dark" ? "text-[#FBC5CC]" : "text-[#c93b4c]"}
            >
              Connect
            </span>
          </h1>

          <p
            className={`text-xl text-center mb-16 max-w-3xl mx-auto font-light ${
              theme === "dark" ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            I'm always excited to meet new people, discuss interesting projects,
            or chat about technology. Feel free to reach out!
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Profile Picture and Contact Info */}
            <div>
              {/* Profile Picture Section */}
              <div className="text-center mb-8">
                <div
                  className={`w-48 h-48 mx-auto rounded-full border-4 overflow-hidden mb-4 ${
                    theme === "dark"
                      ? "border-[#FBC5CC]/30 bg-gradient-to-br from-[#FBC5CC]/20 to-rose-500/20"
                      : "border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50"
                  }`}
                >
                  {/* Placeholder for user's photo */}
                  <div
                    className={`w-full h-full flex items-center justify-center text-6xl ${
                      theme === "dark" ? "text-[#FBC5CC]" : "text-[#c93b4c]"
                    }`}
                  >
                    <img
                      src="./src/img/me_mylo.jpg"
                      alt="Airi Weng"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Replace the emoji above with an img tag when you have a photo: */}
                </div>
                <p
                  className={`text-sm italic font-light ${
                    theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                  }`}
                ></p>
              </div>

              <h2
                className={`text-2xl font-serif font-semibold mb-6 ${
                  theme === "dark" ? "text-neutral-100" : "text-neutral-700"
                }`}
              >
                Get In Touch
              </h2>

              <div
                className={`p-6 rounded-2xl mb-8 backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-neutral-800/50 border border-neutral-700/50"
                    : "bg-white/60 border border-rose-200/40 shadow-lg"
                }`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <MessageCircle
                    className={`mt-1 ${theme === "dark" ? "text-[#FBC5CC]" : "text-[#c93b4c]"}`}
                    size={24}
                  />
                  <div>
                    <h3
                      className={`font-semibold mb-2 ${theme === "dark" ? "text-neutral-100" : "text-neutral-700"}`}
                    >
                      Open to Opportunities
                    </h3>
                    <p
                      className={`font-light ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"}`}
                    >
                      I'm currently looking for summer 2024 internships in
                      software engineering, full-stack development, or product
                      management roles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin
                    className={`mt-1 ${theme === "dark" ? "text-[#FBC5CC]" : "text-[#c93b4c]"}`}
                    size={24}
                  />
                  <div>
                    <h3
                      className={`font-semibold mb-2 ${theme === "dark" ? "text-neutral-100" : "text-neutral-700"}`}
                    >
                      Location
                    </h3>
                    <p
                      className={`font-light ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"}`}
                    >
                      Bay Area, California
                      <br />
                      <span className="text-sm">
                        Open to remote opportunities
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[#FBC5CC]/10 to-rose-500/10 border border-[#FBC5CC]/20"
                    : "bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200"
                }`}
              >
                <h3
                  className={`font-serif font-semibold mb-3 ${theme === "dark" ? "text-neutral-100" : "text-neutral-700"}`}
                >
                  What I'm Looking For
                </h3>
                <ul
                  className={`space-y-2 font-light ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"}`}
                >
                  <li>• Software Engineering Internships</li>
                  <li>• Mentorship opportunities</li>
                  <li>• Interesting project collaborations</li>
                  <li>• Tech community connections</li>
                  <li>• Coffee chats with fellow developers</li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h2
                className={`text-2xl font-serif font-semibold mb-6 ${
                  theme === "dark" ? "text-neutral-100" : "text-neutral-700"
                }`}
              >
                Find Me Online
              </h2>

              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center space-x-4 p-6 rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                      theme === "dark"
                        ? "bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800"
                        : "bg-white/60 border border-rose-200/40 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <div
                      className={`transition-colors duration-200 ${
                        theme === "dark"
                          ? "text-neutral-400"
                          : "text-neutral-500"
                      } ${link.color}`}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${theme === "dark" ? "text-neutral-100" : "text-neutral-700"}`}
                      >
                        {link.name}
                      </h3>
                      <p
                        className={`font-light ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"}`}
                      >
                        {link.username}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div
                className={`mt-8 p-6 rounded-2xl text-center backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-neutral-800/50 border border-neutral-700/50"
                    : "bg-white/60 border border-rose-200/40 shadow-lg"
                }`}
              >
                <h3
                  className={`font-serif font-semibold mb-3 ${theme === "dark" ? "text-neutral-100" : "text-neutral-700"}`}
                >
                  Quick Response Time
                </h3>
                <p
                  className={`font-light ${theme === "dark" ? "text-neutral-300" : "text-neutral-600"}`}
                >
                  I typically respond to emails and messages within 24 hours.
                  Looking forward to hearing from you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
