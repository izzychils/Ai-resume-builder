import { useState } from 'react';
import Button from "../Shared/Button";
import { Check, Eye, ArrowRight, Sparkles } from "lucide-react";

const TemplateCard = ({
  template,
  isSelected,
  onSelect,
  onPreview
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Template design SVG patterns based on style
  const getSvgPattern = (style) => {
    if (style === 'modern') {
      return (
        <svg 
          viewBox="0 0 300 400" 
          className="w-full h-full absolute top-0 left-0 z-10 opacity-90"
        >
          <defs>
            <linearGradient id={`grad-${template.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grad-${template.id})`} />
          <path 
            d="M50,20 L250,20 L250,60 L50,60 Z" 
            fill="#4F46E5" 
            fillOpacity="0.1" 
            className="transition-all duration-500"
          />
          <path 
            d="M50,80 L250,80 L250,100 L50,100 Z" 
            fill="#4F46E5" 
            fillOpacity="0.1" 
          />
          <path 
            d="M50,120 L150,120 L150,340 L50,340 Z" 
            fill="#4F46E5" 
            fillOpacity="0.07" 
          />
          <path 
            d="M170,120 L250,120 L250,340 L170,340 Z" 
            fill="#4F46E5" 
            fillOpacity="0.1" 
          />
          <circle cx="90" cy="40" r="15" fill="#4F46E5" fillOpacity="0.15" />
        </svg>
      );
    } else if (style === 'classic') {
      return (
        <svg 
          viewBox="0 0 300 400" 
          className="w-full h-full absolute top-0 left-0 z-10 opacity-90"
        >
          <defs>
            <linearGradient id={`grad-${template.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#854D0E" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#A16207" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grad-${template.id})`} />
          <path 
            d="M30,20 L270,20 L270,70 L30,70 Z" 
            fill="#A16207" 
            fillOpacity="0.1" 
          />
          <line x1="30" y1="90" x2="270" y2="90" stroke="#A16207" strokeWidth="2" strokeOpacity="0.15" />
          <path 
            d="M30,110 L120,110 L120,340 L30,340 Z" 
            fill="#A16207" 
            fillOpacity="0.07" 
          />
          <path 
            d="M140,110 L270,110 L270,210 L140,210 Z" 
            fill="#A16207" 
            fillOpacity="0.07" 
          />
          <path 
            d="M140,230 L270,230 L270,340 L140,340 Z" 
            fill="#A16207" 
            fillOpacity="0.07" 
          />
        </svg>
      );
    } else {
      // Default pattern
      return (
        <svg 
          viewBox="0 0 300 400" 
          className="w-full h-full absolute top-0 left-0 z-10 opacity-90"
        >
          <defs>
            <linearGradient id={`grad-${template.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#64748B" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grad-${template.id})`} />
          <rect x="40" y="30" width="220" height="40" rx="4" fill="#475569" fillOpacity="0.1" />
          <rect x="40" y="90" width="220" height="10" rx="2" fill="#475569" fillOpacity="0.1" />
          <rect x="40" y="110" width="220" height="10" rx="2" fill="#475569" fillOpacity="0.1" />
          <rect x="40" y="140" width="100" height="180" rx="4" fill="#475569" fillOpacity="0.07" />
          <rect x="160" y="140" width="100" height="80" rx="4" fill="#475569" fillOpacity="0.07" />
          <rect x="160" y="240" width="100" height="80" rx="4" fill="#475569" fillOpacity="0.07" />
        </svg>
      );
    }
  };

  return (
    <div 
      className={`
        relative group rounded-xl overflow-hidden border-2 transition-all duration-300
        transform ${isHovered ? 'scale-102 translate-y-1' : ''}
        ${isSelected
          ? 'border-blue-500 dark:border-blue-400 shadow-lg ring-2 ring-blue-500/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Template Thumbnail/Preview */}
      <div className="aspect-[3/4] bg-white dark:bg-gray-800 overflow-hidden relative">
        {/* SVG Pattern */}
        {getSvgPattern(template.style)}
        
        {/* Content Preview */}
        <div className="absolute inset-0 z-20 flex flex-col p-6">
          <div className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 truncate">
            {template.name}
          </div>
          <div className="w-3/4 h-1 bg-gray-800 dark:bg-gray-200 opacity-10 rounded mb-4"></div>
          
          <div className="flex-1 flex flex-col gap-2 opacity-50">
            {Array(5).fill(0).map((_, idx) => (
              <div key={idx} className="h-2 rounded bg-gray-400 dark:bg-gray-500" 
                   style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}></div>
            ))}
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className={`
          absolute inset-0 bg-blue-600 bg-opacity-80 dark:bg-blue-800 dark:bg-opacity-90
          flex items-center justify-center transition-opacity duration-300
          ${isHovered && !isSelected ? 'opacity-100' : 'opacity-0'} z-30
        `}>
          <Button
            variant="secondary"
            size="md"
            onClick={() => onPreview(template.id)}
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <Eye size={18} className="mr-2" />
            Preview Template
          </Button>
        </div>
      </div>
      
      {/* Template Info */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900 dark:text-white text-lg">
            {template.name}
          </h3>
          {template.premium && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200">
              <Sparkles size={12} />
              Premium
            </span>
          )}
        </div>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="capitalize">{template.region || 'Universal'}</span>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <span className="capitalize">{template.style || 'Modern'}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={isSelected ? "primary" : "outline"}
            size="md"
            onClick={() => onSelect(template.id)}
            className={`
              flex-1 flex items-center justify-center transition-all duration-300
              ${isSelected ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50 dark:hover:bg-gray-700'}
            `}
          >
            {isSelected ? (
              <>
                <Check size={18} className="mr-1.5 animate-scale" />
                Selected
              </>
            ) : (
              <>
                Use Template
                <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => onPreview(template.id)}
            className="flex items-center justify-center aspect-square p-0 w-12 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Preview template"
          >
            <Eye size={18} />
          </Button>
        </div>
      </div>
      
      {/* Selection Badge */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1.5 shadow-md z-40 animate-scaleIn">
          <Check size={14} />
        </div>
      )}
    </div>
  );
};

// Add custom animation keyframes
const CustomStyle = () => (
  <style jsx global>{`
    @keyframes scaleIn {
      0% { transform: scale(0); opacity: 0; }
      70% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes scale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
    
    .animate-scaleIn {
      animation: scaleIn 0.3s ease-out forwards;
    }
    
    .animate-scale {
      animation: scale 0.5s ease-in-out;
    }
    
    .scale-102 {
      transform: scale(1.02);
    }
  `}</style>
);

const EnhancedTemplateCard = (props) => (
  <>
    <CustomStyle />
    <TemplateCard {...props} />
  </>
);

export default EnhancedTemplateCard;