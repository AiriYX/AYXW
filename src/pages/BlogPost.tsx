
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const posts = {
    "AI-and-critical-thinking": {
      title: "AI and Critical Thinking, are we getting smarter or dumber?",
      content: `
        <p>In the world of AI, are we using it to benefit ourselves, that makes us dumber or boosting our intelligence?</p>
        
        <h2>The Double-Edged Sword</h2>
        <p>Artificial Intelligence has become an integral part of our daily lives, from search engines to recommendation systems. But as we increasingly rely on AI to make decisions, solve problems, and even think for us, we must ask ourselves: are we enhancing our cognitive abilities or diminishing them?</p>
        
        <h2>The Case for Enhancement</h2>
        <p>AI can serve as a powerful cognitive amplifier. When used correctly, it can help us process vast amounts of information, identify patterns we might miss, and free up mental resources for higher-level thinking. Students can use AI to quickly research topics, allowing them to focus on analysis and synthesis rather than information gathering.</p>
        
        <h2>The Risk of Atrophy</h2>
        <p>However, there's a genuine concern that over-reliance on AI might lead to cognitive atrophy. Just as GPS navigation has diminished our natural sense of direction, constant AI assistance might weaken our problem-solving muscles and critical thinking skills.</p>
        
        <h2>Finding Balance</h2>
        <p>The key lies in using AI as a tool rather than a crutch. We should leverage AI to augment our capabilities while continuing to exercise our own cognitive functions. This means asking critical questions about AI outputs, understanding the limitations of these systems, and maintaining our ability to think independently.</p>
        
        <p>The future belongs to those who can work symbiotically with AI while preserving their uniquely human capacities for creativity, empathy, and critical thought.</p>
      `,
      date: "Insert date here",
      readTime: "8 min read",
      category: "AI/Tech",
    },
    "love-and-spice": {
      title: "Loving spice? Here may be a reason why.",
      content: `
        <p>Wondered why you like spicy food so much? Truth may tell you deeper about your personality.</p>
        
        <h2>The Science Behind Spice Preference</h2>
        <p>Recent research has revealed fascinating connections between spice tolerance and personality traits. People who enjoy spicy foods often share certain psychological characteristics that go beyond mere taste preferences.</p>
        
        <h2>Sensation Seeking</h2>
        <p>Studies have shown that individuals who love spicy food tend to score higher on sensation-seeking personality scales. These are people who actively seek out new, intense, and thrilling experiences. The burn of capsaicin provides a form of controlled danger that appeals to this personality type.</p>
        
        <h2>Risk Taking and Adventure</h2>
        <p>Spice lovers are often more willing to take risks in other areas of their lives. They're the ones who are likely to try extreme sports, travel to unfamiliar places, or take on challenging career moves. The willingness to endure the discomfort of spicy food correlates with a general tolerance for discomfort in pursuit of rewarding experiences.</p>
        
        <h2>Social and Cultural Factors</h2>
        <p>Beyond personality, our spice preferences are deeply influenced by cultural background and social experiences. Growing up in households where spicy food is the norm creates both physiological tolerance and psychological comfort with intense flavors.</p>
        
        <h2>The Endorphin Connection</h2>
        <p>There's also a biochemical component to spice addiction. The pain caused by capsaicin triggers the release of endorphins, creating a natural high. This means that spice lovers might literally be chasing a chemical reward.</p>
        
        <p>So the next time someone questions your love for that extra-hot sauce, you can tell them it's not just about the food – it's about who you are as a person.</p>
      `,
      date: "Insert date here",
      readTime: "8 min read",
      category: "Research",
    },
    "community-documentation": {
      title: "Creating a finder app with...",
      content: `
        <p>Documentation on creating a community based web-app/ios app</p>
        
        <h2>Project Overview</h2>
        <p>Building a community-based finder application requires careful consideration of user experience, scalability, and community management features. This documentation outlines the key steps and decisions made during the development process.</p>
        
        <h2>Technology Stack</h2>
        <ul>
          <li><strong>Frontend:</strong> React Native for cross-platform compatibility</li>
          <li><strong>Backend:</strong> Node.js with Express framework</li>
          <li><strong>Database:</strong> MongoDB for flexible data storage</li>
          <li><strong>Real-time Features:</strong> Socket.io for live updates</li>
          <li><strong>Maps Integration:</strong> Google Maps API</li>
        </ul>
        
        <h2>Core Features Implementation</h2>
        
        <h3>User Authentication</h3>
        <p>Implemented JWT-based authentication with social login options. Users can register using email or connect through Google/Facebook accounts for faster onboarding.</p>
        
        <h3>Location Services</h3>
        <p>Integrated geolocation APIs to help users find nearby locations and businesses. Implemented caching strategies to reduce API calls and improve performance.</p>
        
        <h3>Community Features</h3>
        <p>Built rating and review systems, user profiles, and social sharing capabilities. Users can create posts, share experiences, and build connections within the community.</p>
        
        <h2>Challenges and Solutions</h2>
        
        <h3>Scalability</h3>
        <p>Implemented caching layers and optimized database queries to handle growing user bases. Used CDN for static assets and implemented lazy loading for better performance.</p>
        
        <h3>User Engagement</h3>
        <p>Added gamification elements like badges and achievements to encourage user participation. Implemented push notifications for relevant community updates.</p>
        
        <h2>Lessons Learned</h2>
        <p>Community building is as important as the technical implementation. Regular user feedback sessions helped shape feature priorities and improve user experience.</p>
        
        <p>The project taught valuable lessons about balancing feature complexity with user needs, and the importance of building for community engagement from day one.</p>
      `,
      date: "Insert date here",
      readTime: "4 min read",
      category: "Learning",
    },
  };

  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <button
            onClick={() => navigate("/writing")}
            className="text-fuchsia-500 hover:text-fuchsia-600 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Writing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <button
          onClick={() => navigate("/writing")}
          className={`flex items-center gap-2 mb-8 transition-colors ${
            theme === "dark"
              ? "text-fuchsia-400 hover:text-fuchsia-300"
              : "text-fuchsia-600 hover:text-fuchsia-500"
          }`}
        >
          <ArrowLeft size={16} />
          Back to Writing
        </button>

        <article className="animate-fade-in">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
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
                className={`flex items-center gap-4 text-sm ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <h1
              className={`text-3xl md:text-4xl font-bold font-serif mb-4 ${
                theme === "dark" ? "text-neutral-100" : "text-neutral-800"
              }`}
            >
              {post.title}
            </h1>
          </header>

          <div
            className={`prose max-w-none ${
              theme === "dark" ? "prose-invert" : ""
            } prose-lg`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
