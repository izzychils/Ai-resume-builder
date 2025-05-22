import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "../Shared/Button";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });
  
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreeTerms: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const validate = (name, value) => {
    let errorMessage = "";
    
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          errorMessage = "Full name is required";
        }
        break;
        
      case "email":
        if (!value.trim()) {
          errorMessage = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
        
      case "password":
        if (!value.trim()) {
          errorMessage = "Password is required";
        } else if (value.length < 8) {
          errorMessage = "Password must be at least 8 characters";
        }
        break;
        
      case "confirmPassword":
        if (!value.trim()) {
          errorMessage = "Please confirm your password";
        } else if (value !== formData.password) {
          errorMessage = "Passwords do not match";
        }
        break;
        
      case "agreeTerms":
        if (!value) {
          errorMessage = "You must agree to the terms and conditions";
        }
        break;
        
      default:
        break;
    }
    
    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });
    
    // Validate on change if the field has been touched
    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validate(name, newValue),
      });
    }
  };
  
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setTouched({
      ...touched,
      [name]: true,
    });
    
    setErrors({
      ...errors,
      [name]: validate(name, newValue),
    });
  };

  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      const errorMessage = validate(key, formData[key]);
      newErrors[key] = errorMessage;
      
      if (errorMessage) {
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true,
    });
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Store user data in localStorage (excluding password)
      const userData = {
        fullName: formData.fullName,
        email: formData.email
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Create a mock auth token
      localStorage.setItem('authToken', 'mock-auth-token-' + Date.now());
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the onSubmit prop function passed from the parent component
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Navigate to dashboard after successful signup
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-4 rounded-md">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${errors.fullName ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white`}
            placeholder="Full Name"
          />
          {errors.fullName && touched.fullName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white`}
            placeholder="your@email.com"
          />
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPasswords ? "text" : "password"}
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white pr-10`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              onClick={togglePasswordVisibility}
              tabIndex="-1"
              aria-label={showPasswords ? "Hide passwords" : "Show passwords"}
            >
              {showPasswords ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <div className="mt-1 relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPasswords ? "text" : "password"}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white pr-10`}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 ${errors.agreeTerms ? "border-red-500" : "dark:border-gray-600"}`}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreeTerms" className="font-medium text-gray-700 dark:text-gray-300">
            I agree to the{" "}
            <a href="#terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Privacy Policy
            </a>
          </label>
          {errors.agreeTerms && touched.agreeTerms && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.agreeTerms}</p>
          )}
        </div>
      </div>

      <div>
        <Button 
          type="submit" 
          fullWidth={true}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="small" color="white" />
              <span className="ml-2">Creating account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;