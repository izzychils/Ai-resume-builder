import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Star,
  MessageSquareText, 
  Lightbulb, 
  Wand2,
  ChevronDown,
  ChevronUp,
  X,
  Save,
  Download,
  Share2
} from 'lucide-react';

// Import shared components
import Navbar from '../components/Shared/Navbar';
import Sidebar from '../components/Shared/Sidebar';
import ResumeForm from '../components/Resume/ResumeForm';
import ResumePreview from '../components/Resume/ResumePreview';

const ResumeBuilder = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [formData, setFormData] = useState({
    personal: {
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      linkedIn: 'linkedin.com/in/alexjohnson',
      website: 'alexjohnson.dev'
    },
    summary: {
      text: 'Experienced software developer with a passion for creating user-friendly applications. Skilled in React, Node.js, and cloud technologies with a focus on building scalable solutions.'
    },
    experience: [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        startDate: '2021-03',
        endDate: '',
        current: true,
        description: 'Developed responsive web applications using React and TypeScript.\nImplemented state management with Redux and optimized app performance.\nCollaborated with design team to create intuitive user interfaces.'
      },
      {
        id: 2,
        title: 'Junior Developer',
        company: 'Digital Solutions LLC',
        location: 'Portland, OR',
        startDate: '2019-06',
        endDate: '2021-02',
        current: false,
        description: 'Built and maintained client websites using JavaScript, HTML, and CSS.\nAssisted in migrating legacy systems to modern frameworks.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'B.S. Computer Science',
        institution: 'University of California',
        location: 'Berkeley, CA',
        startDate: '2015-09',
        endDate: '2019-05',
        description: 'Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development.'
      }
    ],
    skills: [
      { id: 1, name: 'React', level: 'Advanced' },
      { id: 2, name: 'JavaScript', level: 'Advanced' },
      { id: 3, name: 'Node.js', level: 'Intermediate' },
      { id: 4, name: 'TypeScript', level: 'Intermediate' },
      { id: 5, name: 'HTML/CSS', level: 'Advanced' },
      { id: 6, name: 'Git', level: 'Intermediate' },
      { id: 7, name: 'AWS', level: 'Beginner' }
    ],
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2022-08',
        expires: '2025-08'
      }
    ]
  });

  // Mock template data
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const templates = ['modern', 'professional', 'creative', 'minimal'];

  // Handle form field changes
  const handleFormChange = (section, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: value
    }));
  };

  // Animation variants
  const sectionAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const aiPanelAnimation = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.2 }
    }
  };

  // Sections for navigation
  const sections = [
    { id: 'personal', name: 'Personal Info', icon: <User size={20} /> },
    { id: 'summary', name: 'Summary', icon: <MessageSquareText size={20} /> },
    { id: 'experience', name: 'Experience', icon: <Briefcase size={20} /> },
    { id: 'education', name: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'skills', name: 'Skills', icon: <Star size={20} /> },
    { id: 'certifications', name: 'Certifications', icon: <Award size={20} /> }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Builder</h1>
                <p className="text-gray-600 dark:text-gray-300">Create and customize your professional resume</p>
              </motion.div>
              
              <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-md shadow-sm"
                  onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
                >
                  <Wand2 size={16} className="mr-2 text-purple-500" />
                  AI Assistant
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </motion.button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Form Column */}
              <motion.div 
                className="xl:col-span-7 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Section Navigation */}
                <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                  {sections.map(section => (
                    <motion.button
                      key={section.id}
                      className={`px-3 sm:px-5 py-4 flex items-center whitespace-nowrap ${
                        activeSection === section.id 
                          ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-800' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveSection(section.id)}
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
                    >
                      <span className="mr-2">{section.icon}</span>
                      <span className="text-sm sm:text-base">{section.name}</span>
                    </motion.button>
                  ))}
                </div>
                
                {/* Form Content */}
                <div className="p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={sectionAnimation}
                    >
                      <ResumeForm 
                        section={activeSection} 
                        data={formData[activeSection]} 
                        onChange={(value) => handleFormChange(activeSection, value)} 
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
              
              {/* Preview Column */}
              <motion.div 
                className="xl:col-span-5 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Template Controls */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2 sm:mb-0">Template</h3>
                    <div className="flex flex-wrap gap-2">
                      {templates.map(template => (
                        <motion.button
                          key={template}
                          className={`px-3 py-1 text-sm rounded-md ${
                            activeTemplate === template 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveTemplate(template)}
                        >
                          {template.charAt(0).toUpperCase() + template.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Download size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Share2 size={18} />
                    </motion.button>
                  </div>
                </div>
                
                {/* Resume Preview */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">Preview</h3>
                  </div>
                  <div className="p-4 h-full overflow-y-auto">
                    <ResumePreview 
                      data={formData} 
                      template={activeTemplate} 
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      
      {/* AI Assistant Panel - Now more responsive */}
      <AnimatePresence>
        {isAIAssistantOpen && (
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-80 lg:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={aiPanelAnimation}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full text-purple-600 dark:text-purple-400 mr-3">
                  <Wand2 size={20} />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">AI Assistant</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAIAssistantOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X size={20} />
              </motion.button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Job Description</h4>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Upload a job description to tailor your resume</p>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm">
                    Upload Document
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suggestions</h4>
                
                <motion.div 
                  className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg mb-3"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded-full text-purple-600 dark:text-purple-400 mr-3">
                      <Lightbulb size={16} />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm">Add measurable achievements</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Try quantifying your work experience with metrics and specific results.
                      </p>
                      <button className="text-purple-600 dark:text-purple-400 text-sm font-medium mt-2">
                        Generate suggestions
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded-full text-purple-600 dark:text-purple-400 mr-3">
                      <Lightbulb size={16} />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm">Enhance your summary</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Your summary could be more impactful with specific skills relevant to your target role.
                      </p>
                      <button className="text-purple-600 dark:text-purple-400 text-sm font-medium mt-2">
                        Improve summary
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AI Feedback</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Your resume is looking good! Consider adding more technical skills and highlighting specific projects you've worked on to stand out to employers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeBuilder;