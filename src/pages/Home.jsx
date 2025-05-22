import React, {  } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Star, Users, Shield, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const features = [
    {
      icon: <FileText size={24} />,
      title: "Professional Templates",
      description: "Choose from dozens of ATS-optimized templates designed by HR experts."
    },
    {
      icon: <Star size={24} />,
      title: "AI-Powered Suggestions",
      description: "Get smart recommendations to enhance your resume and cover letters."
    },
    {
      icon: <Users size={24} />,
      title: "Tailored for Employers",
      description: "Customize your resume for specific job postings with our AI assistant."
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy First",
      description: "Your data is encrypted and never shared with third parties."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <motion.section 
        className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div 
            className="lg:w-1/2"
            variants={fadeIn}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Standout Resumes with AI
            </h1>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
              Build professional resumes and cover letters in minutes with our AI-powered tools and templates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center justify-center"
                onClick={() => navigate('/login')}
              >
                Get Started <ArrowRight className="ml-2" size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md font-medium"
                onClick={() => navigate('/templates')}
              >
                View Templates
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="../components/Shared/homepic.png" 
              alt="Resume Builder Preview" 
              className="rounded-lg shadow-2xl w-full h-auto sm:hidden"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          variants={fadeIn}
        >
          Features that set us apart
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-900"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">Ready to create your professional resume?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          Join thousands of job seekers who have successfully landed their dream jobs with our platform.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium text-lg shadow-lg"
          onClick={() => navigate('/signup')}
        >
          Create Your Resume Now
        </motion.button>
      </motion.section>
    </div>
  );
};

export default Home;