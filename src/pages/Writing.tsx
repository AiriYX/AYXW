import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen, Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Writing = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const posts = [
    {
      title:
        "Can AI Teach Students to Think? The Quest for Critical Thinking in a World of Instant Answers.",
      excerpt:
        "In the world of AI, are we using it to benefit ourselves, that makes us dumber or boosting our intelligence?",
      date: "Insert date here",
      readTime: "8 min read",
      category: "AI/Tech",
      slug: "ai-and-critical-thinking",
      number: "01",
    },
    {
      title: "Loving spice? Here may be a reason why.",
      excerpt:
        "Wondered why you like spicy food so much? Truth may tell you deeper about your personality.",
      date: "Insert date here",
      readTime: "8 min read",
      category: "Research",
      slug: "love-and-spice",
      number: "02",
    },
    {
      title: "Creating a finder app with...",
      excerpt: "Documentation on creating a community based web-app/ios app",
      date: "Insert date here",
      readTime: "4 min read",
      category: "Learning",
      slug: "community-documentation",
      number: "03",
    },
  ];

  const poems = [
    {
      title: "Morning Coffee Reflections",
      excerpt: "Steam rises from my cup like thoughts ascending to clarity...",
      date: "March 2024",
      mood: "Contemplative",
      slug: "morning-coffee-reflections",
    },
    {
      title: "City Lights",
      excerpt: "Neon dreams paint the midnight sky in shades of possibility...",
      date: "February 2024",
      mood: "Nostalgic",
      slug: "city-lights",
    },
    {
      title: "Digital Solitude",
      excerpt: "In the space between keystrokes, I find myself...",
      date: "January 2024",
      mood: "Introspective",
      slug: "digital-solitude",
    },
    {
      title: "Autumn's Code",
      excerpt:
        "Leaves fall like deprecated functions, making way for new growth...",
      date: "December 2023",
      mood: "Hopeful",
      slug: "autumns-code",
    },
    {
      title: "The Weight of Words",
      excerpt: "Each syllable carries the universe within its sound...",
      date: "November 2023",
      mood: "Philosophical",
      slug: "weight-of-words",
    },
  ];

  const categories = ["All", "Personal", "Technical", "Learning"];
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="animate-fade-in">
          {/* Header inspired by the uploaded image */}
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <h1
                className={`text-4xl md:text-5xl font-bold mb-6 font-playwrite ${
                  theme === "dark" ? "text-neutral-100" : "text-neutral-800"
                } text-center`}
              >
                <span
                  className={
                    theme === "dark" ? "text-fuchsia-400" : "text-fuchsia-600"
                  }
                >
                  Ink{" "}
                </span>
                & Logic
              </h1>
              <p
                className={`text-sm md:text-base text-center font-light mb-2 ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                A little corner for thoughts that don't fit into a GitHub repo.
              </p>
            </div>
          </div>

          {/* Articles Section */}
          <div className="mb-12">
            <h2
              className={`font-playwrite text-3xl md:text-4xl font-semibold text-center mb-12 ${
                theme === "dark" ? "text-neutral-100" : "text-neutral-800"
              }`}
            >
              Articles & Essays
            </h2>

            {/* Posts in numbered format inspired by the image */}
            <div className="space-y-16">
              {filteredPosts.map((post, index) => (
                <article
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/writing/blog/${post.slug}`)}
                >
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Left side - Number and title */}
                    <div className="lg:w-1/2 flex items-start gap-6">
                      {/* Large number */}
                      <div
                        className={`text-8xl font-bold opacity-20 ${
                          theme === "dark"
                            ? "text-neutral-500"
                            : "text-neutral-300"
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
                              theme === "dark"
                                ? "text-neutral-400"
                                : "text-neutral-500"
                            }`}
                          >
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Content and visual element */}
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
                                      theme === "dark"
                                        ? "bg-rose-300"
                                        : "bg-rose-600"
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
                            theme === "dark"
                              ? "text-neutral-300"
                              : "text-neutral-600"
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
                            className="group-hover:translate-x-1 transition-transform duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Poetry Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart
                  className={`${
                    theme === "dark" ? "text-rose-400" : "text-rose-600"
                  }`}
                  size={28}
                />
                <h2
                  className={`font-playwrite text-3xl md:text-4xl font-semibold ${
                    theme === "dark" ? "text-rose-400" : "text-rose-500"
                  }`}
                >
                  Poetry
                </h2>
                <Heart
                  className={`${
                    theme === "dark" ? "text-rose-400" : "text-rose-600"
                  }`}
                  size={28}
                />
              </div>
              <p
                className={`text-lg font-light ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                Words that flow from the heart
              </p>
            </div>

            {/* Horizontal Poetry Scroll */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 min-w-max">
                {poems.map((poem, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/writing/poetry/${poem.slug}`)}
                    className={`flex-shrink-0 w-80 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-neutral-800/60 to-neutral-900/40 border border-neutral-700/50 hover:border-rose-300/30"
                        : "bg-gradient-to-br from-white/80 to-rose-50/60 border border-rose-200/40 shadow-lg hover:shadow-xl hover:border-rose-600/30"
                    }`}
                  >
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            theme === "dark"
                              ? "bg-rose-300/20 text-rose-300"
                              : "bg-rose-200 text-rose-600"
                          }`}
                        >
                          {poem.mood}
                        </span>
                        <span
                          className={`text-xs ${
                            theme === "dark"
                              ? "text-neutral-500"
                              : "text-neutral-400"
                          }`}
                        >
                          {poem.date}
                        </span>
                      </div>
                      <h3
                        className={`text-xl font-serif font-semibold mb-3 ${
                          theme === "dark"
                            ? "text-neutral-100"
                            : "text-neutral-800"
                        }`}
                      >
                        {poem.title}
                      </h3>
                    </div>

                    <p
                      className={`text-sm italic leading-relaxed mb-4 ${
                        theme === "dark"
                          ? "text-neutral-300"
                          : "text-neutral-600"
                      }`}
                    >
                      "{poem.excerpt}"
                    </p>

                    <div
                      className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                        theme === "dark"
                          ? "text-rose-400 hover:text-white"
                          : "text-rose-600 hover:text-rose-500"
                      }`}
                    >
                      <BookOpen size={14} />
                      <span>Read full poem</span>
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {filteredPosts.length === 0 && (
            <div
              className={`text-center py-12 ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              <p>No posts found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Writing;
