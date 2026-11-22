import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./footer/Footer";
import { useTheme } from "@/contexts/ThemeContext";

const Layout = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0716]" : "bg-[#ffeef6]"
      }`}
    >
      <Navigation />
      <main className="transition-all duration-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
