import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Edit, 
  Download, 
  Share2, 
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react';

// Import shared components
import Navbar from '../components/Shared/Navbar';
import Sidebar from '../components/Shared/Sidebar';

const Resumes = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('lastModified');
  const [filterTemplate, setFilterTemplate] = useState('all');

  // Mock data for resumes
  const allResumes = [
    { 
      id: 1, 
      title: 'Software Developer Resume', 
      lastModified: '2 days ago', 
      template: 'Modern', 
      jobApplications: 4
    },
    { 
      id: 2, 
      title: 'Product Manager', 
      lastModified: '1 week ago', 
      template: 'Professional', 
      jobApplications: 2
    },
    { 
      id: 3, 
      title: 'UX Designer Resume', 
      lastModified: '3 weeks ago', 
      template: 'Creative', 
      jobApplications: 7
    },
    { 
      id: 4, 
      title: 'Data Scientist', 
      lastModified: '1 month ago', 
      template: 'Simple', 
      jobApplications: 3
    },
    { 
      id: 5, 
      title: 'Marketing Specialist', 
      lastModified: '2 months ago', 
      template: 'Professional', 
      jobApplications: 0
    }
  ];

  // Filter and sort resumes
  const filteredResumes = allResumes
    .filter(resume => {
      const matchesSearch = resume.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTemplate = filterTemplate === 'all' || resume.template === filterTemplate;
      return matchesSearch && matchesTemplate;
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'applications') {
        return b.jobApplications - a.jobApplications;
      } else {
        // Default: sort by lastModified (most recent first)
        // This is a simplified sorting, in a real app you'd parse dates properly
        return a.lastModified.includes('day') ? -1 : 
               b.lastModified.includes('day') ? 1 : 
               a.lastModified.includes('week') ? -1 : 
               b.lastModified.includes('week') ? 1 : 0;
      }
    });

  // Templates for filter dropdown
  const templates = ['all', 'Modern', 'Professional', 'Creative', 'Simple'];

  // Animations
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const confirmDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      // In a real application, you would call an API to delete the resume
      console.log(`Resume ${id} deleted`);
      // Then update state or refetch data
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerAnimation}
          >
            {/* Header with actions */}
            <motion.div 
              className="flex flex-col md:flex-row md:items-center justify-between mb-6"
              variants={itemAnimation}
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Resumes</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and organize all your resume versions</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={() => navigate('/resume-builder')}
              >
                <Plus size={16} className="mr-1" />
                Create New Resume
              </motion.button>
            </motion.div>

            {/* Search and filter bar */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6"
              variants={itemAnimation}
            >
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search resumes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <button
                      onClick={() => setFilterOpen(!filterOpen)}
                      className="flex items-center space-x-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                    >
                      <Filter size={16} />
                      <span>Template: {filterTemplate === 'all' ? 'All' : filterTemplate}</span>
                      <ChevronDown size={16} />
                    </button>
                    {filterOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                        <ul className="py-1">
                          {templates.map((template) => (
                            <li key={template}>
                              <button
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  template === filterTemplate ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'
                                }`}
                                onClick={() => {
                                  setFilterTemplate(template);
                                  setFilterOpen(false);
                                }}
                              >
                                {template === 'all' ? 'All Templates' : template}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <select
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="lastModified">Last Modified</option>
                    <option value="title">Title (A-Z)</option>
                    <option value="applications">Most Applications</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Resume List */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
              variants={itemAnimation}
            >
              {filteredResumes.length === 0 ? (
                <div className="p-8 text-center">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No resumes found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm || filterTemplate !== 'all' ? 
                      'Try adjusting your search or filters' : 
                      'Create your first resume to get started'}
                  </p>
                  {!searchTerm && filterTemplate === 'all' && (
                    <button
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={() => navigate('/resume-builder')}
                    >
                      Create Resume
                    </button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredResumes.map((resume) => (
                    <motion.div 
                      key={resume.id}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            <FileText size={20} className="text-gray-600 dark:text-gray-300" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{resume.title}</h3>
                            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
                              <p className="mr-4">Template: {resume.template}</p>
                              <p>Last modified: {resume.lastModified}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            title="Edit"
                            onClick={() => navigate(`/resume-builder/${resume.id}`)}
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            title="Download"
                          >
                            <Download size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            title="Share"
                          >
                            <Share2 size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                            title="Delete"
                            onClick={() => confirmDelete(resume.id, resume.title)}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </div>
                      <div className="mt-3 pl-12">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          resume.jobApplications > 0 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {resume.jobApplications} Application{resume.jobApplications !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Resumes;