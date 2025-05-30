import React, { useEffect } from "react";
import imageExp from "@/assets/img/imageExp";
import {
  GraduationCap,
  Heart,
  Coffee,
  Star,
  Mail,
  Pencil,
  BrainCircuit,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  MapPin,
  Camera,
  Image,
  Palette,
  Eye,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import meMylo from "../assets/img/me_mylo.jpeg";

const About = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "#0f0f0f" : "#fefefe";
  }, [theme]);

  const interests = [
    { icon: <Coffee size={20} />, text: "Cafe hopping" },
    { icon: <Pencil size={20} />, text: "Poetry" },
    { icon: <BrainCircuit size={20} />, text: "Solving hardware puzzles" },
    { icon: <GraduationCap size={20} />, text: "Learning languages" },
  ];

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
      url: "https://linkedin.com/in/airi-weng/",
      username: "/in/airi-weng",
      color: "hover:text-blue-600",
    },
  ];

  const photo = Object.entries(imageExp).map(([key, url], index) => ({
    id: index + 1,
    url,
    alt: key.replace(/([A-Z])/g, " $1").trim() + " photo",
  }));

  return (
    <div className="pt-20 min-h-screen relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="animate-fade-in">
          {/* Enhanced Header without Glow */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h1
                className={`text-4xl md:text-5xl font-bold mb-6 font-playwrite ${
                  theme === "dark" ? "text-neutral-100" : "text-neutral-800"
                } text-center`}
              >
                Hey there!{" "}
                <span
                  className={`${
                    theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"
                  }`}
                >
                  You made it!
                </span>
              </h1>
              {/* Soft underline */}
              <div
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent"
                    : "bg-gradient-to-r from-transparent via-fuchsia-600/40 to-transparent"
                }`}
              ></div>
            </div>
          </div>

          {/* Top section - Profile Picture and Contact Info side by side */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Profile Picture Section - Left */}
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div
                    className={`relative p-2 rounded-full ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-fuchsia-400/30 to-rose-400/30 shadow-lg"
                        : "bg-gradient-to-br from-rose-200/70 to-pink-200/70 shadow-xl"
                    }`}
                  >
                    <div
                      className={`w-64 h-64 rounded-full overflow-hidden border-4 ${
                        theme === "dark"
                          ? "border-neutral-700/50 shadow-inner"
                          : "border-white/80 shadow-inner"
                      }`}
                    >
                      <img
                        src={meMylo}
                        alt="Airi Weng"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Decorative elements around the frame */}
                  <div
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 text-2xl animate-pulse ${
                      theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"
                    }`}
                  >
                    ✨
                  </div>
                  <div
                    className={`absolute top-8 -right-4 text-xl animate-bounce ${
                      theme === "dark" ? "text-pink-400" : "text-pink-500"
                    }`}
                    style={{ animationDelay: "0.5s" }}
                  >
                    💖
                  </div>
                  <div
                    className={`absolute top-12 -left-4 text-lg animate-spin ${
                      theme === "dark" ? "text-yellow-400" : "text-yellow-500"
                    }`}
                    style={{ animationDuration: "3s" }}
                  >
                    ⭐
                  </div>
                  <div
                    className={`absolute bottom-4 -right-2 text-lg animate-pulse ${
                      theme === "dark" ? "text-pink-400" : "text-pink-400"
                    }`}
                    style={{ animationDelay: "1s" }}
                  >
                    🌸
                  </div>
                  <div
                    className={`absolute bottom-8 -left-3 text-base animate-bounce ${
                      theme === "dark" ? "text-blue-400" : "text-blue-500"
                    }`}
                    style={{ animationDelay: "1.5s", animationDuration: "2s" }}
                  >
                    🪐
                  </div>
                </div>
              </div>

              {/* Photography Portfolio Grid */}
              <div>
                <h3
                  className={`text-xl font-serif font-semibold mb-4 text-center lg:text-left ${
                    theme === "dark" ? "text-neutral-100" : "text-neutral-800"
                  }`}
                >
                  Photography Portfolio
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {photo.map((photo) => (
                    <div
                      key={photo.id}
                      className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                        theme === "dark"
                          ? "bg-neutral-800 border border-neutral-700"
                          : "bg-neutral-100 border border-neutral-200"
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information - Right */}
            <div className="space-y-8">
              <div>
                <h2
                  className={`text-2xl font-serif font-semibold mb-6 ${
                    theme === "dark" ? "text-neutral-100" : "text-neutral-800"
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
                      className={`mt-1 ${
                        theme === "dark"
                          ? "text-fuchsia-400"
                          : "text-fuchsia-600"
                      }`}
                      size={24}
                    />
                    <div>
                      <h3
                        className={`font-semibold mb-2 ${
                          theme === "dark"
                            ? "text-neutral-100"
                            : "text-neutral-800"
                        }`}
                      >
                        Open to Opportunities
                      </h3>
                      <p
                        className={`font-light ${
                          theme === "dark"
                            ? "text-neutral-300"
                            : "text-neutral-600"
                        }`}
                      >
                        I'm currently looking for summer 2026 - 2027 (anytime in
                        between) internships in software engineering, full-stack
                        development, project management roles, or devOPs roles.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin
                      className={`mt-1 ${
                        theme === "dark"
                          ? "text-fuchsia-400"
                          : "text-fuchsia-600"
                      }`}
                      size={24}
                    />
                    <div>
                      <h3
                        className={`font-semibold mb-2 ${
                          theme === "dark"
                            ? "text-neutral-100"
                            : "text-neutral-800"
                        }`}
                      >
                        Location
                      </h3>
                      <p
                        className={`font-light ${
                          theme === "dark"
                            ? "text-neutral-300"
                            : "text-neutral-600"
                        }`}
                      >
                        NYC Metropolitan Area, NY
                        <br />
                        <span className="text-sm">
                          Open to remote opportunities
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h2
                  className={`text-2xl font-serif font-semibold mb-6 ${
                    theme === "dark" ? "text-neutral-100" : "text-neutral-800"
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
                          className={`font-semibold ${
                            theme === "dark"
                              ? "text-neutral-100"
                              : "text-neutral-800"
                          }`}
                        >
                          {link.name}
                        </h3>
                        <p
                          className={`font-light ${
                            theme === "dark"
                              ? "text-neutral-300"
                              : "text-neutral-600"
                          }`}
                        >
                          {link.username}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Photography Skills Section */}

          {/* Other content below */}
          <div className="space-y-8">
            {/* Journey section */}
            <div
              className={`p-8 rounded-2xl backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-neutral-800/40 border border-neutral-700/30"
                  : "bg-white/60 border border-neutral-200/40 shadow-lg"
              }`}
            >
              <h2
                className={`text-2xl font-serif font-semibold mb-6 ${
                  theme === "dark" ? "text-neutral-100" : "text-neutral-800"
                }`}
              >
                My Journey
              </h2>
              <div
                className={`space-y-4 text-lg leading-relaxed font-light ${
                  theme === "dark" ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                <p>
                  I'm an upper Junior at City College of New York studying
                  Computer Science with a focus on automation and efficency.
                  Linking problem solving into programming. My passion lies at
                  the intersection of technology and human experience, creating
                  solutions that not only work well but feel intuitive and
                  delightful to use.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring the latest tech
                  trends, writing about poetry journey, or cafe hopping to
                  collaborating with fellow students. I believe in the power of
                  community and sharing knowledge to lift each other up.
                </p>
                <p>
                  I'm always eager to learn new technologies and take on
                  challenges that push me outside my comfort zone. Currently,
                  I'm particularly interested in automation and AI applications
                  and sustainable tech solutions.
                </p>
              </div>
            </div>

            {/* Two column layout for remaining content */}
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className={`p-6 rounded-2xl backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-neutral-800/40 border border-neutral-700/30"
                    : "bg-white/60 border border-neutral-200/40 shadow-lg"
                }`}
              >
                <h3
                  className={`text-xl font-serif font-semibold mb-4 ${
                    theme === "dark" ? "text-neutral-100" : "text-neutral-800"
                  }`}
                >
                  Quick Facts
                </h3>
                <div
                  className={`space-y-3 font-light ${
                    theme === "dark" ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <GraduationCap
                      className={
                        theme === "dark"
                          ? "text-fuchsia-400"
                          : "text-fuchsia-600"
                      }
                      size={20}
                    />
                    <span>CCNY '27</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📍</span>
                    <span>NY, NY</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💼</span>
                    <span>Seeking Summer 2025 - 2026 Internships</span>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-neutral-800/40 border border-neutral-700/30"
                    : "bg-white/60 border border-neutral-200/40 shadow-lg"
                }`}
              >
                <h3
                  className={`text-xl font-serif font-semibold mb-4 ${
                    theme === "dark" ? "text-neutral-100" : "text-neutral-800"
                  }`}
                >
                  When I'm Not Coding
                </h3>
                <div className="space-y-3">
                  {interests.map((interest, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 font-light ${
                        theme === "dark"
                          ? "text-neutral-300"
                          : "text-neutral-600"
                      }`}
                    >
                      <span
                        className={
                          theme === "dark"
                            ? "text-fuchsia-400"
                            : "text-fuchsia-600"
                        }
                      >
                        {interest.icon}
                      </span>
                      <span>{interest.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
