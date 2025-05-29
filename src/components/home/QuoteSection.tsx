
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Code2, Layers, TrendingUp } from 'lucide-react';

const QuoteSection = () => {
  const { theme } = useTheme();

  const cards = [
    {
      icon: Code2,
      title: 'Computer Science',
      description: 'Building solutions with clean code and thoughtful architecture',
      color: 'rose',
      size: 'normal'
    },
    {
      icon: Layers,
      title: 'Full Stack',
      description: 'From concept to deployment, bringing ideas to life end-to-end',
      color: 'fuchsia',
      size: 'large'
    }
  ];

  const alwaysLearningCard = {
    icon: TrendingUp,
    title: 'Always Learning',
    description: 'Embracing new technologies and evolving with the industry',
    color: 'teal',
    size: 'normal'
  };

  const getColorClasses = (color: string) => {
    const colors = {
      rose: {
        bg: theme === 'dark' ? 'hover:bg-rose-900/30' : 'hover:bg-rose-50/80',
        border: theme === 'dark' ? 'hover:border-rose-400/40' : 'hover:border-rose-300/60',
        icon: theme === 'dark' ? 'text-rose-400' : 'text-rose-500',
        title: theme === 'dark' ? 'group-hover:text-rose-300' : 'group-hover:text-rose-700',
        glow: theme === 'dark' ? 'hover:shadow-rose-500/20' : 'hover:shadow-rose-200/40'
      },
      fuchsia: {
        bg: theme === 'dark' ? 'hover:bg-fuchsia-900/30' : 'hover:bg-fuchsia-50/80',
        border: theme === 'dark' ? 'hover:border-fuchsia-400/40' : 'hover:border-fuchsia-300/60',
        icon: theme === 'dark' ? 'text-fuchsia-400' : 'text-fuchsia-500',
        title: theme === 'dark' ? 'group-hover:text-fuchsia-300' : 'group-hover:text-fuchsia-700',
        glow: theme === 'dark' ? 'hover:shadow-fuchsia-500/20' : 'hover:shadow-fuchsia-200/40'
      },
      teal: {
        bg: theme === 'dark' ? 'hover:bg-teal-900/30' : 'hover:bg-teal-50/80',
        border: theme === 'dark' ? 'hover:border-teal-400/40' : 'hover:border-teal-300/60',
        icon: theme === 'dark' ? 'text-teal-400' : 'text-teal-500',
        title: theme === 'dark' ? 'group-hover:text-teal-300' : 'group-hover:text-teal-700',
        glow: theme === 'dark' ? 'hover:shadow-teal-500/20' : 'hover:shadow-teal-200/40'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className={`relative py-20 px-6 overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-neutral-900/50 via-neutral-800/30 to-neutral-900/80' 
        : 'bg-gradient-to-br from-neutral-50/80 via-white/60 to-neutral-100/50'
    }`}>
      {/* Subtle background pattern */}
      <div className={`absolute inset-0 opacity-30 ${
        theme === 'dark' ? 'bg-neutral-800/20' : 'bg-neutral-100/40'
      } bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]`}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Masonry-style grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left column - First two cards with staggered positioning */}
          <div className="lg:col-span-5 space-y-6">
            {cards.map((card, index) => {
              const colorClasses = getColorClasses(card.color);
              const Icon = card.icon;
              
              return (
                <div 
                  key={index}
                  className={`group relative p-6 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                    index === 1 ? 'lg:ml-8 lg:mt-8' : ''
                  } ${
                    card.size === 'large' ? 'lg:p-8' : ''
                  } ${
                    theme === 'dark'
                      ? 'bg-neutral-800/60 border border-neutral-700/40 hover:bg-neutral-800/80 hover:shadow-2xl'
                      : 'bg-white/80 border border-neutral-200/50 shadow-lg hover:shadow-2xl'
                  } ${colorClasses.bg} ${colorClasses.border} ${colorClasses.glow}`}
                  style={{
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Floating icon with enhanced interaction */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    theme === 'dark' ? 'bg-neutral-700/50' : 'bg-neutral-100/80'
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors duration-300 ${colorClasses.icon}`} />
                  </div>

                  {/* Enhanced typography */}
                  <h3 className={`text-xl font-bold mb-3 tracking-tight transition-colors duration-300 ${
                    theme === 'dark' ? 'text-neutral-100' : 'text-neutral-800'
                  } ${colorClasses.title}`}>
                    {card.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed font-light transition-colors duration-300 ${
                    theme === 'dark' ? 'text-neutral-300 group-hover:text-neutral-200' : 'text-neutral-600 group-hover:text-neutral-700'
                  }`}>
                    {card.description}
                  </p>

                  {/* Subtle accent line */}
                  <div className={`w-12 h-0.5 mt-4 rounded-full transition-all duration-300 group-hover:w-20 ${colorClasses.icon.replace('text-', 'bg-')}`}></div>
                </div>
              );
            })}
          </div>

          {/* Right column - Featured quote and Always Learning card */}
          <div className="lg:col-span-7 lg:pl-8 space-y-6">
            {/* Featured quote with prominence */}
            <div className={`group relative p-10 lg:p-12 rounded-[2rem] backdrop-blur-sm transition-all duration-700 hover:scale-[1.02] hover:-translate-y-3 cursor-pointer ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-neutral-800/70 to-neutral-900/60 border border-neutral-700/50 hover:border-neutral-600/60 hover:shadow-3xl hover:shadow-fuchsia-500/10'
                : 'bg-gradient-to-br from-white/90 to-neutral-50/80 border border-neutral-200/60 shadow-xl hover:shadow-2xl hover:shadow-rose-200/30'
            }`}>
              
              {/* Quote mark decoration */}
              <div className={`absolute top-6 left-8 text-6xl font-serif leading-none transition-all duration-300 group-hover:scale-110 ${
                theme === 'dark' ? 'text-fuchsia-400/20' : 'text-rose-400/30'
              }`}>
                "
              </div>

              {/* Enhanced quote typography */}
              <blockquote className={`relative z-10 text-xl lg:text-2xl font-light italic leading-relaxed mb-8 mt-6 tracking-wide transition-colors duration-300 ${
                theme === 'dark' ? 'text-neutral-100 group-hover:text-neutral-50' : 'text-neutral-700 group-hover:text-neutral-800'
              }`}>
                When you drop a book, you don't walk away. You pick it up and keep reading. True resilience means never leaving your story unfinished, no matter how many times you have to pick it up.
              </blockquote>
              
              {/* Enhanced accent line with animation */}
              <div className={`w-20 h-1 rounded-full transition-all duration-500 group-hover:w-32 ${
                theme === 'dark' ? 'bg-gradient-to-r from-fuchsia-400 to-rose-400' : 'bg-gradient-to-r from-rose-500 to-fuchsia-500'
              }`}></div>

              {/* Floating background element */}
              <div className={`absolute bottom-8 right-8 w-24 h-24 rounded-full opacity-10 transition-all duration-500 group-hover:scale-125 group-hover:opacity-20 ${
                theme === 'dark' ? 'bg-fuchsia-400' : 'bg-rose-400'
              }`}></div>
            </div>

            {/* Always Learning card positioned under the quote */}
            <div className="lg:ml-8">
              {(() => {
                const colorClasses = getColorClasses(alwaysLearningCard.color);
                const Icon = alwaysLearningCard.icon;
                
                return (
                  <div 
                    className={`group relative p-6 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-neutral-800/60 border border-neutral-700/40 hover:bg-neutral-800/80 hover:shadow-2xl'
                        : 'bg-white/80 border border-neutral-200/50 shadow-lg hover:shadow-2xl'
                    } ${colorClasses.bg} ${colorClasses.border} ${colorClasses.glow}`}
                    style={{
                      transformOrigin: 'center center'
                    }}
                  >
                    {/* Floating icon with enhanced interaction */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                      theme === 'dark' ? 'bg-neutral-700/50' : 'bg-neutral-100/80'
                    }`}>
                      <Icon className={`w-6 h-6 transition-colors duration-300 ${colorClasses.icon}`} />
                    </div>

                    {/* Enhanced typography */}
                    <h3 className={`text-xl font-bold mb-3 tracking-tight transition-colors duration-300 ${
                      theme === 'dark' ? 'text-neutral-100' : 'text-neutral-800'
                    } ${colorClasses.title}`}>
                      {alwaysLearningCard.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed font-light transition-colors duration-300 ${
                      theme === 'dark' ? 'text-neutral-300 group-hover:text-neutral-200' : 'text-neutral-600 group-hover:text-neutral-700'
                    }`}>
                      {alwaysLearningCard.description}
                    </p>

                    {/* Subtle accent line */}
                    <div className={`w-12 h-0.5 mt-4 rounded-full transition-all duration-300 group-hover:w-20 ${colorClasses.icon.replace('text-', 'bg-')}`}></div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal section divider */}
      <div className={`absolute bottom-0 left-0 right-0 h-24 ${
        theme === 'dark' 
          ? 'bg-gradient-to-t from-neutral-900 to-transparent' 
          : 'bg-gradient-to-t from-neutral-50 to-transparent'
      }`} style={{
        clipPath: 'polygon(0 60%, 100% 100%, 0 100%)'
      }}></div>
    </section>
  );
};

export default QuoteSection;
