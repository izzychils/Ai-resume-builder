import { useState } from "react";
import { ArrowLeft, Crown, Check, Sparkles } from "lucide-react";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Shared/Sidebar";

const Subscription = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Current plan (free) and features for the detailed view
  const planDetails = {
    free: {
      name: "Free",
      price: "$0",
      description: "Basic resume building tools",
      buttonText: "Current Plan",
      features: [
        "Basic resume templates (3)",
        "Limited exports (2/month)",
        "Standard ATS optimization",
        "Basic job matching",
        "Text-only cover letters"
      ],
      color: "gray"
    },
    pro: {
      name: "Pro",
      price: "$9.99",
      description: "Advanced tools for serious job seekers",
      buttonText: "Upgrade to Pro",
      features: [
        "All free features",
        "Unlimited exports",
        "Premium templates (15+)",
        "AI content suggestions",
        "Cover letter generator",
        "Job tailoring assistant",
        "Email support",
        "Resume analytics"
      ],
      color: "blue"
    },
    max: {
      name: "Max",
      price: "$19.99",
      description: "Complete career advancement solution",
      buttonText: "Upgrade to Max",
      features: [
        "All Pro features",
        "Custom branded resumes",
        "Priority support",
        "Interview preparation tools",
        "Global format optimization",
        "LinkedIn optimization",
        "Resume performance analytics",
        "Career coaching session (1/month)",
        "Unlimited AI content generation"
      ],
      color: "purple"
    }
  };

  // Additional individual premium features that can be added
  const premiumAddOns = [
    {
      name: "Interview Coaching",
      description: "1-on-1 coaching sessions with career experts",
      price: "$29.99",
      plan: "addon"
    },
    {
      name: "Portfolio Website",
      description: "Create a personal branded website from your resume",
      price: "$5.99/mo",
      plan: "addon"
    },
    {
      name: "Application Tracker",
      description: "Track all your job applications in one dashboard",
      price: "$3.99/mo",
      plan: "addon"
    }
  ];

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    // In a real app, you would handle the subscription process here
    alert(`You selected the ${plan} plan. This would redirect to payment.`);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Current Plan Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Crown size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Free Plan</h2>
                  <p className="text-blue-100">Upgrade to unlock premium features and take your resume to the next level</p>
                </div>
              </div>
            </div>

            {/* Plan Comparison */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Choose Your Plan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(planDetails).map(([key, plan]) => (
                  <div 
                    key={key} 
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border-2 ${
                      key === 'pro' 
                        ? 'border-blue-500 dark:border-blue-400 transform md:-translate-y-2' 
                        : key === 'max' 
                          ? 'border-purple-500 dark:border-purple-400' 
                          : 'border-transparent'
                    }`}
                  >
                    {key === 'pro' && (
                      <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                      <div className="mt-2 flex items-baseline">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                        {key !== 'free' && <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>}
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
                      
                      <ul className="mt-6 space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check 
                              size={16} 
                              className={`mt-0.5 mr-2 flex-shrink-0 ${
                                key === 'free' 
                                  ? 'text-gray-500 dark:text-gray-400' 
                                  : key === 'pro' 
                                    ? 'text-blue-500 dark:text-blue-400' 
                                    : 'text-purple-500 dark:text-purple-400'
                              }`} 
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button 
                        onClick={() => handleUpgrade(key)} 
                        className={`mt-8 w-full py-2 px-4 rounded-md transition-colors ${
                          key === 'free' 
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-default'
                            : key === 'pro'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                        disabled={key === 'free'}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Additional Premium Features */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Premium Add-ons</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {premiumAddOns.map((addon, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md text-purple-600 dark:text-purple-400 mr-3">
                        <Sparkles size={20} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{addon.name}</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{addon.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">{addon.price}</span>
                      <button className="py-1.5 px-3 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                        Add to plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Can I cancel my subscription at any time?</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing cycle.</p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">What payment methods do you accept?</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">We accept all major credit cards, PayPal, and Apple Pay.</p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Is there a limit to how many resumes I can create?</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Free accounts can create up to 3 resumes. Pro and Max subscriptions allow unlimited resume creation.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Subscription;