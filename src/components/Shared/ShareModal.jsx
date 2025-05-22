import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, onShare }) => {
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Modal animation
  const modalAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  // Generate a shareable link when the modal opens
  useEffect(() => {
    // Only generate a link if we don't already have one and the modal is open
    if (isOpen && !shareLink) {
      setIsGenerating(true);
      
      // Simulate network request delay
      const timer = setTimeout(() => {
        const generatedLink = `https://myresume.app/share/${Math.random().toString(36).substring(2, 10)}`;
        setShareLink(generatedLink);
        setIsGenerating(false);
        
        if (onShare) {
          onShare(generatedLink);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    // Reset states when modal closes
    if (!isOpen) {
      setShareLink('');
      setCopied(false);
    }
  }, [isOpen, onShare, shareLink]);

  // Copy link to clipboard
  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-30 backdrop-blur-sm p-4">
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalAnimation}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-medium text-gray-900 dark:text-white">Share Your Resume</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X size={18} />
          </motion.button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Share this link with others to give them access to your resume:
          </p>
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
            {isGenerating ? (
              <div className="flex-1 p-2 text-gray-500 dark:text-gray-400 text-center">
                <div className="inline-flex items-center">
                  <svg
                    className="animate-spin w-4 h-4 mr-2 text-blue-600 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating link...
                </div>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 py-2 px-3 bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-200"
                />
                <button 
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {copied ? "Copied to clipboard!" : "Click the icon to copy link"}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-lg text-right">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ShareModal;