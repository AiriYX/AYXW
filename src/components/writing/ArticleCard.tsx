// src/components/writing/ArticleCard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { format } from "date-fns"; // Make sure date-fns is installed and imported
import { BlogPostOverviewData } from "@/pages/Writing"; // Import the type from Writing.tsx

interface ArticleCardProps {
  post: BlogPostOverviewData;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <article
      key={post.slug}
      className="group cursor-pointer"
      onClick={() => navigate(`/writing/blog/${post.slug}`)}
    >
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left side - Number and title */}
        <div className="lg:w-1/2 flex items-start gap-6">
          {/* Large number */}
          <div
            className={`text-8xl font-bold opacity-20 ${
              theme === "dark" ? "text-neutral-500" : "text-neutral-300"
            }`}
          >
            {post.number}
          </div>

          <div className="flex-1">
            <h2
              className={`text-2xl md:text-3xl font-serif font-semibold mb-4 transition-colors duration-200 ${
                theme === "dark"
                  ? "text-neutral-100 group-hover:text-fuchsia-500"
                  : "text-neutral-800 group-hover:text-fuchsia-500"
              }`}
            >
              {post.title}
            </h2>

            <div className="flex items-center space-x-4 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  theme === "dark"
                    ? "bg-fuchsia-300/20 text-fuchsia-300"
                    : "bg-fuchsia-200 text-fuchsia-600"
                }`}
              >
                {post.category}
              </span>

              <div
                className={`flex items-center space-x-4 text-sm ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  {/* Change the format string here */}
                  <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Excerpt and visual element */}
        <div className="lg:w-1/2">
          <div
            className={`p-8 rounded-2xl transition-all duration-300 group-hover:scale-[1.02] ${
              theme === "dark"
                ? "bg-neutral-800/30 border border-neutral-700/30"
                : "bg-neutral-50/50 border border-neutral-200/50"
            }`}
          >
            <div className="mb-6 relative h-32 overflow-hidden rounded-lg">
              <div
                className={`absolute inset-0 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-neutral-800 to-neutral-700"
                    : "bg-gradient-to-r from-neutral-100 to-neutral-50"
                }`}
              >
                {/* Abstract dots pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-2 opacity-30">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          theme === "dark" ? "bg-rose-300" : "bg-rose-600"
                        }`}
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          opacity: Math.random() > 0.5 ? 0.8 : 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p
              className={`mb-6 leading-relaxed font-light ${
                theme === "dark" ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              {post.excerpt}
            </p>

            <div
              className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                theme === "dark"
                  ? "text-fuchsia-400 group-hover:text-white"
                  : "text-fuchsia-600 group-hover:text-fuchsia-500"
              }`}
            >
              <span>Read more</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
