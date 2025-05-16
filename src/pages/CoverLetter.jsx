import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const CoverLetter = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    companyName: '',
    keyPoints: '',
  });
  
  // Mock generated cover letter
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const mockLetter = `
Dear Hiring Manager at ${formData.companyName},

I am writing to express my interest in the ${formData.jobTitle} position at ${formData.companyName}. With my background in this field, I believe I would be a valuable addition to your team.

${formData.keyPoints}

I am excited about the opportunity to bring my skills to ${formData.companyName} and contribute to your continued success. I look forward to the possibility of discussing how my background, skills, and achievements can benefit your organization.

Thank you for considering my application.

Sincerely,
${formData.fullName}
      `;
      
      setGeneratedLetter(mockLetter.trim());
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter)
      .then(() => {
        // In a real app, you might show a toast notification here
        console.log('Cover letter copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  const handleRegenerate = () => {
    setIsGenerating(true);
    
    // Simulate regeneration with slight changes
    setTimeout(() => {
      const regeneratedLetter = `
Dear Hiring Team at ${formData.companyName},

I am writing to apply for the ${formData.jobTitle} role at ${formData.companyName}. Having researched your company's mission and values, I am confident that my skills and experience align perfectly with what you're looking for.

${formData.keyPoints}

I am particularly drawn to ${formData.companyName}'s innovative approach and would welcome the opportunity to contribute to your team's success. I am available for an interview at your convenience to discuss how my qualifications match your requirements.

Thank you for your time and consideration.

Best regards,
${formData.fullName}
      `;
      
      setGeneratedLetter(regeneratedLetter.trim());
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">AI Cover Letter Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Job Details</h2>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                            focus:ring-blue-500 focus:border-blue-500 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Frontend Developer"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                            focus:ring-blue-500 focus:border-blue-500 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Acme Inc."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                            focus:ring-blue-500 focus:border-blue-500 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="keyPoints" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key Qualifications & Achievements
                </label>
                <textarea
                  id="keyPoints"
                  name="keyPoints"
                  value={formData.keyPoints}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="List your relevant skills, experiences, and achievements..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                            focus:ring-blue-500 focus:border-blue-500 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                >
                  {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Description Upload (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 
                                                        border-2 border-gray-300 border-dashed rounded-lg 
                                                        cursor-pointer bg-gray-50 dark:hover:bg-gray-700 
                                                        dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, or TXT (MAX. 2MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </form>
          </div>
          
          {/* Generated Cover Letter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Generated Cover Letter</h2>
              
              <div className="flex space-x-2">
                {generatedLetter && (
                  <>
                    <button
                      onClick={handleRegenerate}
                      disabled={isGenerating || !generatedLetter}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded
                              focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
                    >
                      Regenerate
                    </button>
                    <button
                      onClick={handleCopy}
                      disabled={isGenerating || !generatedLetter}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded
                              focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-60"
                    >
                      Copy
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {isGenerating ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-pulse text-gray-600 dark:text-gray-400">
                  Generating your cover letter...
                </div>
              </div>
            ) : generatedLetter ? (
              <div className="whitespace-pre-line bg-gray-50 dark:bg-gray-700 p-6 rounded-md h-96 overflow-y-auto
                              text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                {generatedLetter}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                Fill in the form and click "Generate Cover Letter" to create your personalized cover letter
              </div>
            )}
            
            {generatedLetter && (
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>You can edit this cover letter directly or click "Regenerate" for a new version.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;