
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Poetry = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const poems = {
    "morning-coffee-reflections": {
      title: "Morning Coffee Reflections",
      content: `Steam rises from my cup like thoughts ascending to clarity,
Each swirl a meditation on the day ahead.
The bitter warmth awakens more than senses—
It stirs the soul from its nocturnal rest.

In this quiet hour before the world intrudes,
I find myself in the space between sleep and wake,
Where dreams still linger on the edges of consciousness
And possibilities stretch infinite and unnamed.

The coffee cools as contemplation deepens,
Its surface reflecting the morning light
That filters through my window like hope
Through the fabric of an ordinary day.

Here, in this simple ritual of warmth and waiting,
I discover that peace lives not in grand gestures
But in the gentle ceremony of being present
To the steam rising from my cup.`,
      date: "March 2024",
      mood: "Contemplative",
    },
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
    },
    "digital-solitude": {
      title: "Digital Solitude",
      content: `In the space between keystrokes, I find myself
Suspended in the blue glow of screens,
Where silence is measured in milliseconds
And connection comes through fiber optic dreams.

The cursor blinks like a digital heartbeat,
Waiting for words that capture the ineffable—
How do we love in an age of algorithms?
How do we touch through walls of glass?

My fingers dance across keys worn smooth
By countless conversations, confessions, and code.
Each tap a tiny prayer sent into the void,
Each message a bottle thrown into digital seas.

Yet in this networked isolation,
I discover a paradox of modern being:
Never have we been more connected,
Never have we felt more alone.

But perhaps solitude isn't the absence of others—
Perhaps it's the presence of self,
Found in the quiet moments between notifications,
In the pause before we hit send.`,
      date: "January 2024",
      mood: "Introspective",
    },
    "autumns-code": {
      title: "Autumn's Code",
      content: `Leaves fall like deprecated functions,
Making way for new growth,
Each branch pruned by wind and time
Writing its own elegant algorithm.

The trees debug themselves naturally,
Releasing what no longer serves,
Their golden output scattered on the ground
Like comments left by a careful programmer.

I walk through this organic repository,
Where version control is managed by seasons
And every change is committed
To the eternal branch of becoming.

The air is crisp with the scent of transformation,
Each breath a compilation of possibilities.
In autumn's quiet refactoring,
I see the beauty of letting go.

What if we could code like trees?
Shedding old patterns gracefully,
Trusting that spring will bring
Fresh ideas and green growth.

In the rustling of dying leaves,
I hear the whisper of renewal:
Sometimes the most elegant solution
Is knowing when to start over.`,
      date: "December 2023",
      mood: "Hopeful",
    },
    "weight-of-words": {
      title: "The Weight of Words",
      content: `Each syllable carries the universe within its sound,
Heavy with the burden of meaning,
Light with the possibility of flight.
We speak worlds into being.

In the beginning was the Word,
And the word was with us,
And we are responsible
For every breath we give it.

I feel the weight of "love" on my tongue,
How it changes the very air around me.
I taste the bitterness of "goodbye,"
The sweetness of "welcome home."

Words are not mere vessels for thoughts—
They are living things that grow
In the space between speaker and listener,
Creating bridges where none existed.

Sometimes I am afraid to speak,
Knowing that once released,
Words take on lives of their own,
Dancing beyond my control.

But silence, too, has its weight,
Its own gravity that pulls
At the things we never say,
The poems that live and die unspoken.

So I choose my words carefully,
Like a gardener selecting seeds,
Knowing that what I plant today
Will bloom in tomorrow's conversations.`,
      date: "November 2023",
      mood: "Philosophical",
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
                className={`${theme === "dark" ? "text-rose-400" : "text-rose-600"}`}
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
                className={`${theme === "dark" ? "text-rose-400" : "text-rose-600"}`}
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
