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
  Share2,
  Eye,
  Link,
  Printer
} from 'lucide-react';

// Import shared components - these are external and won't be changed
// import Navbar from '../components/Shared/Navbar';
// import Sidebar from '../components/Shared/Sidebar';
// import ResumeForm from '../components/Resume/ResumeForm';
// import ResumePreview from '../components/Resume/ResumePreview';

// Mock components for demonstration purposes
const Navbar = () => (
  <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 fixed top-0 left-0 right-0 z-10">
    <h1 className="text-lg font-bold">Resume Builder</h1>
  </div>
);

const Sidebar = ({ isOpen }) => (
  <div className={`fixed left-0 top-16 h-full bg-gray-800 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
    <div className="p-4 text-white">Sidebar Content</div>
  </div>
);

const ResumeForm = ({ section, data, onChange }) => (
  <div className="text-gray-700 dark:text-gray-300">
    {section === 'personal' && (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input type="text" value={data.firstName} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input type="text" value={data.lastName} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={data.email} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input type="tel" value={data.phone} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
        </div>
      </div>
    )}
    
    {section === 'summary' && (
      <div>
        <label className="block text-sm font-medium mb-1">Professional Summary</label>
        <textarea value={data.text} rows={6} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
      </div>
    )}
    
    {section === 'experience' && (
      <div className="space-y-6">
        {data.map((exp, index) => (
          <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium mb-2">{exp.title} at {exp.company}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input type="text" value={exp.title} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input type="text" value={exp.company} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={exp.description} rows={4} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
            </div>
          </div>
        ))}
        <button className="w-full p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          + Add Experience
        </button>
      </div>
    )}
    
    {section === 'education' && (
      <div className="space-y-6">
        {data.map((edu) => (
          <div key={edu.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium mb-2">{edu.degree}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Degree</label>
                <input type="text" value={edu.degree} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Institution</label>
                <input type="text" value={edu.institution} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
              </div>
            </div>
          </div>
        ))}
        <button className="w-full p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          + Add Education
        </button>
      </div>
    )}
    
    {section === 'skills' && (
      <div className="space-y-4">
        {data.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <span>{skill.name}</span>
            <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
              {skill.level}
            </span>
          </div>
        ))}
        <button className="w-full p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          + Add Skill
        </button>
      </div>
    )}
    
    {section === 'certifications' && (
      <div className="space-y-6">
        {data.map((cert) => (
          <div key={cert.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium mb-2">{cert.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" value={cert.name} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Issuer</label>
                <input type="text" value={cert.issuer} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" />
              </div>
            </div>
          </div>
        ))}
        <button className="w-full p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          + Add Certification
        </button>
      </div>
    )}
  </div>
);

const ResumePreview = ({ data, template }) => (
  <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg h-full">
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{data.personal.firstName} {data.personal.lastName}</h1>
      <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
        <span>{data.personal.email}</span>
        <span>•</span>
        <span>{data.personal.phone}</span>
        <span>•</span>
        <span>{data.personal.location}</span>
      </div>
    </div>
    
    <div className="mb-6">
      <h2 className="text-lg font-medium border-b border-gray-300 dark:border-gray-600 pb-1 mb-3">Summary</h2>
      <p className="text-gray-700 dark:text-gray-300">{data.summary.text}</p>
    </div>
    
    <div className="mb-6">
      <h2 className="text-lg font-medium border-b border-gray-300 dark:border-gray-600 pb-1 mb-3">Experience</h2>
      {data.experience.map((exp) => (
        <div key={exp.id} className="mb-4">
          <div className="flex justify-between">
            <h3 className="font-medium">{exp.title}</h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
              {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
            </span>
          </div>
          <div className="text-gray-700 dark:text-gray-300">{exp.company}, {exp.location}</div>
          <p className="text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-line">{exp.description}</p>
        </div>
      ))}
    </div>
    
    <div>
      <h2 className="text-lg font-medium border-b border-gray-300 dark:border-gray-600 pb-1 mb-3">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill) => (
          <span key={skill.id} className="bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full text-sm">
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ResumeBuilder = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
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
  
  const previewAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
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

  // Generate a shareable link
  const generateShareableLink = () => {
    // In a real app, this would create an actual sharable link
    alert('Shareable link generated: https://resume.app/share/axj29dk3');
  };

  // Mock download function
  const downloadResume = (format) => {
    alert(`Downloading resume in ${format} format...`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content */}
        <main className="flex-1 h-full">
          <div className="p-4 md:p-6 max-w-7xl mx-auto h-full">
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
            
            <div className="h-[calc(100%-88px)]">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow h-full overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex h-full flex-col">
                  {/* Section Navigation - now with fixed height and no overflow */}
                  <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
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
                  
                  <div className="flex flex-1 h-full">
                    {/* Form Content - now with fixed height */}
                    <div className="p-4 sm:p-6 flex-1 h-full overflow-y-auto">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSection}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={sectionAnimation}
                          className="h-full"
                        >
                          <ResumeForm 
                            section={activeSection} 
                            data={formData[activeSection]} 
                            onChange={(value) => handleFormChange(activeSection, value)} 
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    
                    {/* Actions Panel */}
                    <div className="w-64 border-l border-gray-200 dark:border-gray-700 p-4 space-y-6">
                      {/* Template Selection */}
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Template</h3>
                        <div className="space-y-2">
                          {templates.map(template => (
                            <motion.button
                              key={template}
                              className={`w-full px-3 py-2 text-sm rounded-md flex items-center ${
                                activeTemplate === template 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                              }`}
                              whileHover={{ y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setActiveTemplate(template)}
                            >
                              <FileText size={16} className="mr-2" />
                              {template.charAt(0).toUpperCase() + template.slice(1)}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Resume Actions */}
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Actions</h3>
                        <div className="space-y-2">
                          <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center text-sm"
                            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                          >
                            <Eye size={16} className="mr-2" />
                            {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md flex items-center text-sm"
                            onClick={() => downloadResume('pdf')}
                          >
                            <Download size={16} className="mr-2" />
                            Download PDF
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md flex items-center text-sm"
                            onClick={() => downloadResume('docx')}
                          >
                            <FileText size={16} className="mr-2" />
                            Download DOCX
                          </motion.button>
                          
                          <div className="relative">
                            <motion.button
                              whileHover={{ y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md flex items-center text-sm"
                              onClick={() => setShowShareOptions(!showShareOptions)}
                            >
                              <Share2 size={16} className="mr-2" />
                              Share Resume
                            </motion.button>
                            
                            <AnimatePresence>
                              {showShareOptions && (
                                <motion.div 
                                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                >
                                  <button 
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center"
                                    onClick={generateShareableLink}
                                  >
                                    <Link size={14} className="mr-2" />
                                    Generate Link
                                  </button>
                                  <button 
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center"
                                    onClick={() => alert('Email functionality would go here')}
                                  >
                                    <MessageSquareText size={14} className="mr-2" />
                                    Email Resume
                                  </button>
                                  <button 
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center"
                                    onClick={() => alert('Print functionality would go here')}
                                  >
                                    <Printer size={14} className="mr-2" />
                                    Print Resume
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  

      {/* AI Assistant Panel */}
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
  );
};
              
export default ResumeBuilder;