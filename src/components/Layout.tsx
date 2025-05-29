import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useTheme } from "@/contexts/ThemeContext";

const Layout = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-neutral-900 via-neutral-900 to-stone-900"
          : "bg-gradient-to-br from-neutral-50 via-stone-50 to-amber-50"
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
