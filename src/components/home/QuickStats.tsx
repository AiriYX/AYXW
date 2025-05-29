
import React from 'react';
import { GraduationCap, Code, Rocket } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const QuickStats = () => {
  const { theme } = useTheme();

  const stats = [
    {
      icon: GraduationCap,
      title: 'Computer Science',
      subtitle: 'Stanford University \'25',
      color: 'rose'
    },
    {
      icon: Code,
      title: 'Full-Stack Developer',
      subtitle: 'React, Node.js, Python',
      color: 'fuchsia'
    },
    {
      icon: Rocket,
      title: 'Always Learning',
      subtitle: 'AI/ML & HCI Focus',
      color: 'teal'
    }
  ];

  const getHoverClasses = (color: string) => {
    switch (color) {
      case 'rose':
        return theme === 'dark' 
          ? 'hover:border-rose-400/30 hover:shadow-rose-400/10' 
          : 'hover:border-rose-300/50 hover:shadow-rose-200/30';
      case 'fuchsia':
        return theme === 'dark' 
          ? 'hover:border-fuchsia-400/30 hover:shadow-fuchsia-400/10' 
          : 'hover:border-fuchsia-300/50 hover:shadow-fuchsia-200/30';
      case 'teal':
        return theme === 'dark' 
          ? 'hover:border-teal-400/30 hover:shadow-teal-400/10' 
          : 'hover:border-teal-300/50 hover:shadow-teal-200/30';
      default:
        return '';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'rose':
        return theme === 'dark' ? 'text-rose-400' : 'text-rose-500';
      case 'fuchsia':
        return theme === 'dark' ? 'text-fuchsia-400' : 'text-fuchsia-500';
      case 'teal':
        return theme === 'dark' ? 'text-teal-400' : 'text-teal-500';
      default:
        return theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500';
    }
  };

  return (
    <div className="pt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-4xl mx-auto animate-fade-in">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div 
              key={index} 
              className={`group p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800/80'
                  : 'bg-white/70 border-neutral-200 hover:bg-white/90'
              } ${getHoverClasses(stat.color)}`}
            >
              <div className="mb-4">
                <IconComponent 
                  size={24} 
                  className={`${getIconColor(stat.color)} group-hover:scale-110 transition-transform duration-300`} 
                />
              </div>
              
              <h3 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-neutral-100' : 'text-neutral-800'
              }`}>
                {stat.title}
              </h3>
              
              <p className={`text-sm font-light ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                {stat.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickStats;
