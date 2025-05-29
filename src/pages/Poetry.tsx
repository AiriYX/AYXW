import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Poetry = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const poems = {
    "city-lights": {
      title: "City Lights",
      content: `Neon dreams paint the midnight sky in shades of possibility,
Each window a story waiting to be told.
The city breathes in electric sighs,
Exhaling the hopes of a million souls.

Streets pulse with the rhythm of restless hearts,
Footsteps echoing against concrete and steel.
In this labyrinth of light and shadow,
We are all searching for something real.

The subway rumbles beneath our feet
Like the heartbeat of some sleeping giant,
Carrying strangers toward uncertain destinations,
Each journey a leap of faith.

Above, the stars compete with billboards
For our attention and our wonder,
But sometimes, in the space between
The bright lights and the darkness,

We catch a glimpse of who we truly are—
Not lost in the crowd, but found
In the beautiful anonymity
Of being small beneath the vast sky.`,
      date: "February 2024",
      mood: "Nostalgic",
      feature: false,
    },
    "the-seasons": {
      title: "The seasons",
      content: ``,
      date: "January 2024",
      mood: "Melchondly",
      pdf_link: "",
      feature: true,
    },
    "misty-future": {
      title: "Misty Future",
      content: `Falling behind your footsteps,
Inked within the pale snows.
Your scent fades the more I try to grasp.
Stranger, we never have met, but why does your name rings faintly familiar.
Our shared memories awaken in my mind.
The tunes unfold gently, their melancholy lingers in the silence of a blank stare.
Had I ever known you at all?`,
      date: "January 2024",
      mood: "Melchondly",
      pdf_link: "",
      feature: true,
    },
    "traces-of-you": {
      title: "Traces of you",
      content: `Falling behind your footsteps,
Inked within the pale snows.
Your scent fades the more I try to grasp.
Stranger, we never have met, but why does your name rings faintly familiar.
Our shared memories awaken in my mind.
The tunes unfold gently, their melancholy lingers in the silence of a blank stare.
Had I ever known you at all?`,
      date: "January 2024",
      mood: "Melchondly",
      pdf_link: "",
      feature: true,
    },
  };

  const poem = poems[slug as keyof typeof poems];

  if (!poem) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Poem not found</h1>
          <button
            onClick={() => navigate("/writing")}
            className="text-rose-500 hover:text-rose-600 flex items-center gap-2"
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
              ? "text-rose-400 hover:text-rose-300"
              : "text-rose-600 hover:text-rose-500"
          }`}
        >
          <ArrowLeft size={16} />
          Back to Writing
        </button>

        <article className="animate-fade-in">
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart
                className={`${
                  theme === "dark" ? "text-rose-400" : "text-rose-600"
                }`}
                size={24}
              />
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  theme === "dark"
                    ? "bg-rose-300/20 text-rose-300"
                    : "bg-rose-200 text-rose-600"
                }`}
              >
                {poem.mood}
              </span>
              <Heart
                className={`${
                  theme === "dark" ? "text-rose-400" : "text-rose-600"
                }`}
                size={24}
              />
            </div>
            <h1
              className={`text-3xl md:text-4xl font-bold font-serif mb-4 ${
                theme === "dark" ? "text-neutral-100" : "text-neutral-800"
              }`}
            >
              {poem.title}
            </h1>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {poem.date}
            </p>
          </header>

          <div
            className={`max-w-2xl mx-auto text-center leading-relaxed text-lg font-light whitespace-pre-line ${
              theme === "dark" ? "text-neutral-200" : "text-neutral-700"
            }`}
          >
            {poem.content}
          </div>
        </article>
      </div>
    </div>
  );
};

export default Poetry;
