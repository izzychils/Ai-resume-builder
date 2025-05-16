import { useState, useEffect } from 'react';
import { 
  Search,
  SlidersHorizontal, 
  X,
  ChevronRight, 
  Star,
  Sparkles,
  Check
} from 'lucide-react';
import EnhancedTemplateCard from '../components/Templates/TemplateCard';
import Sidebar from '../components/Shared/Sidebar';
import Navbar from '../components/Shared/Navbar'

// Mock template data with premium flag
const templateData = [
  {
    id: 1,
    name: 'Modern Professional',
    thumbnail: '/api/placeholder/220/300',
    region: 'US',
    style: 'modern',
    premium: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Classic Corporate',
    thumbnail: '/api/placeholder/220/300',
    region: 'EU',
    style: 'classic',
    premium: false,
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Creative Portfolio',
    thumbnail: '/api/placeholder/220/300',
    region: 'US',
    style: 'modern',
    premium: false,
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Academic CV',
    thumbnail: '/api/placeholder/220/300',
    region: 'EU',
    style: 'classic',
    premium: true,
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Minimalist Design',
    thumbnail: '/api/placeholder/220/300',
    region: 'Asia',
    style: 'modern',
    premium: false,
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Executive Resume',
    thumbnail: '/api/placeholder/220/300',
    region: 'US',
    style: 'classic',
    premium: true,
    rating: 4.7,
  },
];

const regions = ['All', 'US', 'EU', 'Asia'];
const styles = ['All', 'modern', 'classic'];

// Mock Sidebar component for this demo
// const Sidebar = ({ isOpen, toggleSidebar }) => (
//   <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
//     <div className="p-4">
//       <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI Resume Builder</h2>
//     </div>
//   </div>
// );

// Mock Navbar component for this demo
// const Navbar = ({ toggleSidebar }) => (
//   <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="flex items-center justify-between h-16">
//         <div className="flex items-center">
//           <button 
//             onClick={toggleSidebar}
//             className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
//             aria-label="Toggle sidebar"
//           >
//             <div className="w-6 h-6">Menu</div>
//           </button>
//           <div className="ml-4 md:ml-0 font-bold text-xl md:text-2xl">AI Resume Builder</div>
//         </div>
//       </div>
//     </div>
//   </nav>
// );

const Templates = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filterAnimation, setFilterAnimation] = useState(false);
  const [visibleTemplates, setVisibleTemplates] = useState(templateData); // Start with all templates visible
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle filter panel visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setFilterAnimation(true);
    setTimeout(() => setFilterAnimation(false), 500);
  };

  // Filter templates based on selected filters and search term
  useEffect(() => {
    const filteredTemplates = templateData.filter((template) => {
      const regionMatch = selectedRegion === 'All' || template.region === selectedRegion;
      const styleMatch = selectedStyle === 'All' || template.style === selectedStyle;
      const searchMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
      return regionMatch && styleMatch && searchMatch;
    });
    
    // Use a more reliable approach to animate templates
    setVisibleTemplates([]); // Clear templates
    
    // Add templates back after a short delay for animation effect
    const timer = setTimeout(() => {
      setVisibleTemplates(filteredTemplates);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [selectedRegion, selectedStyle, searchTerm]);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId === selectedTemplate ? null : templateId);
  };

  const handlePreviewTemplate = (templateId) => {
    setPreviewTemplate(templateId);
  };

  // const closePreview = () => {
  //   setPreviewTemplate(null);
  // };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />
      
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="md:ml-64 transition-all duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Resume Templates</span>
              {selectedTemplate && (
                <span className="inline-flex items-center text-sm font-medium py-1 px-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 animate-fadeIn">
                  <Check size={14} className="mr-1" />
                  Template Selected
                </span>
              )}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Select from our professionally designed templates to create your standout resume. 
              Each template is optimized for ATS systems and HR professionals.
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFilter}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isFilterOpen 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <SlidersHorizontal size={18} className={filterAnimation ? 'animate-wiggle' : ''} />
                Filters {isFilterOpen ? 'Applied' : ''}
              </button>
              
              {/* Filter quick info */}
              {(selectedRegion !== 'All' || selectedStyle !== 'All') && (
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 animate-fadeIn">
                  {selectedRegion !== 'All' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      Region: {selectedRegion}
                      <button 
                        onClick={() => setSelectedRegion('All')} 
                        className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {selectedStyle !== 'All' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      Style: {selectedStyle}
                      <button 
                        onClick={() => setSelectedStyle('All')} 
                        className="ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Expanded Filters */}
          {isFilterOpen && (
            <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-slideDown">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg text-gray-800 dark:text-white">Filter Templates</h3>
                <button onClick={toggleFilter} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Region
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <button
                        key={region}
                        onClick={() => handleRegionChange(region)}
                        className={`px-4 py-2 text-sm rounded-md transition-all duration-300 ${
                          selectedRegion === region
                            ? 'bg-blue-600 text-white shadow-md scale-105 transform'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Style
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((style) => (
                      <button
                        key={style}
                        onClick={() => handleStyleChange(style)}
                        className={`px-4 py-2 text-sm rounded-md transition-all duration-300 ${
                          selectedStyle === style
                            ? 'bg-blue-600 text-white shadow-md scale-105 transform'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {style === 'All' ? style : style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Templates grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTemplates.map((template, index) => (
              <div 
                key={template.id} 
                className="opacity-0 animate-fadeInUp" 
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {/* Simple Template Card for testing - replace with your EnhancedTemplateCard */}
                <div 
                  className={`
                    relative group rounded-xl overflow-hidden border-2 transition-all duration-300
                    ${selectedTemplate === template.id
                      ? 'border-blue-500 dark:border-blue-400 shadow-lg ring-2 ring-blue-500/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'}
                  `}
                >
                  {/* Template Thumbnail/Preview */}
                  <div className="aspect-[3/4] bg-white dark:bg-gray-800 overflow-hidden relative">
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
                      <button
                        onClick={() => handleSelectTemplate(template.id)}
                        className={`
                          flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-all duration-300
                          ${selectedTemplate === template.id 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}
                        `}
                      >
                        {selectedTemplate === template.id ? (
                          <>
                            <Check size={18} className="mr-1.5" />
                            Selected
                          </>
                        ) : (
                          <>
                            Use Template
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handlePreviewTemplate(template.id)}
                        className="flex items-center justify-center aspect-square p-2 rounded-md border border-gray-300 dark:border-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Preview template"
                      >
                        <Search size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Selection Badge */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1.5 shadow-md z-40">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {visibleTemplates.length === 0 && (
            <div className="text-center py-16 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No templates found</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                No templates match your current filters. Try adjusting your search criteria or filters.
              </p>
              <button 
                onClick={() => {
                  setSelectedRegion('All');
                  setSelectedStyle('All');
                  setSearchTerm('');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {selectedTemplate && (
            <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40 animate-slideUp">
              <div className="flex items-center justify-between">
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">{templateData.find(t => t.id === selectedTemplate)?.name}</span> template selected
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedTemplate(null)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Global Animations */}
          <style jsx global>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes wiggle {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-10deg); }
              75% { transform: rotate(10deg); }
            }
            
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out forwards;
            }
            
            .animate-fadeInUp {
              animation: fadeInUp 0.5s ease-out forwards;
            }
            
            .animate-slideDown {
              animation: slideDown 0.3s ease-out forwards;
            }
            
            .animate-slideUp {
              animation: slideUp 0.3s ease-out forwards;
            }
            
            .animate-wiggle {
              animation: wiggle 0.5s ease-in-out;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Templates;