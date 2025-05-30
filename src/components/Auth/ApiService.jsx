// services/api.js
import emailjs from '@emailjs/browser';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// EmailJS configuration
const EMAILJS_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
};

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.emailJSInitialized = false;
    
    // Initialize EmailJS with validation
    this.initializeEmailJS();
  }

  initializeEmailJS() {
    try {
      if (!EMAILJS_CONFIG.PUBLIC_KEY || !EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID) {
        console.warn('EmailJS configuration incomplete. Please check your environment variables:');
        console.warn('VITE_EMAILJS_PUBLIC_KEY');
        console.warn('VITE_EMAILJS_SERVICE_ID'); 
        console.warn('VITE_EMAILJS_TEMPLATE_ID');
        return;
      }

      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      this.emailJSInitialized = true;
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      this.emailJSInitialized = false;
    }
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token && !token.startsWith('mock-')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Generate 6-digit reset code
  generateResetCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Store reset code temporarily (in-memory storage for demo)
  storeResetCode(email, code) {
    const resetData = {
      email,
      code,
      timestamp: Date.now(),
      expiresAt: Date.now() + (20 * 60 * 1000), // 20 minutes
      attempts: 0 // Track verification attempts
    };
    
    // Store in sessionStorage with error handling
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const resetCodes = JSON.parse(sessionStorage.getItem('resetCodes') || '{}');
        resetCodes[email] = resetData;
        sessionStorage.setItem('resetCodes', JSON.stringify(resetCodes));
      }
    } catch (error) {
      console.error('Failed to store reset code:', error);
      // Fallback to memory storage could be implemented here
    }
    
    return resetData;
  }

  // Verify reset code with attempt limiting
  verifyResetCode(email, code) {
    try {
      if (typeof window === 'undefined' || !window.sessionStorage) return false;
      
      const resetCodes = JSON.parse(sessionStorage.getItem('resetCodes') || '{}');
      const resetData = resetCodes[email];
      
      if (!resetData) {
        return { valid: false, error: 'No reset code found for this email' };
      }

      // Check if too many attempts
      if (resetData.attempts >= 5) {
        return { valid: false, error: 'Too many verification attempts. Please request a new code.' };
      }

      // Check if expired
      if (Date.now() >= resetData.expiresAt) {
        this.clearResetCode(email); // Clean up expired code
        return { valid: false, error: 'Reset code has expired. Please request a new code.' };
      }

      // Increment attempts
      resetData.attempts = (resetData.attempts || 0) + 1;
      resetCodes[email] = resetData;
      sessionStorage.setItem('resetCodes', JSON.stringify(resetCodes));

      // Check if code matches
      const isValid = resetData.code === code;
      
      if (!isValid) {
        return { 
          valid: false, 
          error: `Invalid code. ${5 - resetData.attempts} attempts remaining.`,
          attemptsRemaining: 5 - resetData.attempts
        };
      }

      return { valid: true };
      
    } catch (error) {
      console.error('Error verifying reset code:', error);
      return { valid: false, error: 'Error verifying code' };
    }
  }

  // Clear reset code after use
  clearResetCode(email) {
    try {
      if (typeof window === 'undefined' || !window.sessionStorage) return;
      
      const resetCodes = JSON.parse(sessionStorage.getItem('resetCodes') || '{}');
      delete resetCodes[email];
      sessionStorage.setItem('resetCodes', JSON.stringify(resetCodes));
    } catch (error) {
      console.error('Failed to clear reset code:', error);
    }
  }

  // Check if reset code exists and is valid
  hasValidResetCode(email) {
    try {
      if (typeof window === 'undefined' || !window.sessionStorage) return false;
      
      const resetCodes = JSON.parse(sessionStorage.getItem('resetCodes') || '{}');
      const resetData = resetCodes[email];
      
      return resetData && Date.now() < resetData.expiresAt && (resetData.attempts || 0) < 5;
    } catch (error) {
      console.error('Error checking reset code:', error);
      return false;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        full_name: userData.fullName,
        email: userData.email,
        password: userData.password,
      }),
    });
  }

  async login(credentials) {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
  }

  async googleSignin(idToken) {
    return this.makeRequest('/auth/google-signin', {
      method: 'POST',
      body: JSON.stringify({
        id_token: idToken,
      }),
    });
  }

  // Frontend-only password reset using EmailJS
  async sendPasswordResetCode(email) {
    try {
      // Validate email format
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Please provide a valid email address');
      }

      // Check if EmailJS is properly initialized
      if (!this.emailJSInitialized) {
        throw new Error('Email service is not properly configured. Please contact support.');
      }

      // Check if there's already a valid reset code (prevent spam)
      if (this.hasValidResetCode(email)) {
        return {
          message: 'A reset code was already sent to your email. Please check your inbox or wait before requesting a new code.',
          status: 'info'
        };
      }

      // Generate reset code
      const code = this.generateResetCode();
      
      // Store code temporarily
      this.storeResetCode(email, code);
      
      // Prepare email parameters
      const emailParams = {
        to_email: email,
        reset_code: code,
        to_name: email.split('@')[0], // Use email prefix as name
        expires_in: '20 minutes',
        app_name: 'GIDE'
      };
      
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        emailParams,
        EMAILJS_CONFIG.PUBLIC_KEY // Include public key in send call as well
      );
      
      console.log('Password reset email sent:', result);
      
      return {
        message: 'Reset code sent to your email successfully',
        status: 'success'
      };
      
    } catch (error) {
      console.error('Failed to send reset email:', error);
      
      // Provide more specific error messages
      if (error.message.includes('Invalid \'to\' email')) {
        throw new Error('Invalid email address provided');
      } else if (error.message.includes('The service ID is required')) {
        throw new Error('Email service configuration error. Please contact support.');
      } else if (error.message.includes('The template ID is required')) {
        throw new Error('Email template configuration error. Please contact support.');
      } else if (error.message.includes('The public key is required')) {
        throw new Error('Email service authentication error. Please contact support.');
      }
      
      throw new Error(error.message || 'Failed to send reset email. Please try again.');
    }
  }

  // Verify reset code (frontend-only)
  async verifyPasswordResetCode(email, code) {
    try {
      if (!email || !code) {
        throw new Error('Email and verification code are required');
      }

      if (code.length !== 6 || !/^\d{6}$/.test(code)) {
        throw new Error('Please enter a valid 6-digit code');
      }

      const verification = this.verifyResetCode(email, code);
      
      if (!verification.valid) {
        throw new Error(verification.error || 'Invalid verification code');
      }
      
      return {
        message: 'Code verified successfully',
        status: 'success'
      };
      
    } catch (error) {
      console.error('Code verification failed:', error);
      throw error;
    }
  }

  // Reset password (you'll still need backend for this)
  async resetPassword(email, code, newPassword) {
    try {
      if (!email || !code || !newPassword) {
        throw new Error('Email, verification code, and new password are required');
      }

      if (newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // First verify the code
      await this.verifyPasswordResetCode(email, code);
      
      // Clear the reset code immediately to prevent reuse
      this.clearResetCode(email);
      
      // Call your backend to actually update the password
      return this.makeRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          verification_code: code,
          new_password: newPassword,
        }),
      });
      
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }

  // Alternative method for when backend doesn't exist yet
  async updatePasswordLocal(email, code, newPassword) {
    try {
      // Verify the code first
      await this.verifyPasswordResetCode(email, code);
      
      // Clear the reset code
      this.clearResetCode(email);
      
      // For now, just return success (you'd implement actual password update logic)
      console.log('Password would be updated for:', email);
      
      return {
        message: 'Password updated successfully',
        status: 'success'
      };
      
    } catch (error) {
      console.error('Local password update failed:', error);
      throw error;
    }
  }

  // User profile endpoints
  async getUserProfile() {
    return this.makeRequest('/users/profile');
  }

  async updateUserProfile(userData) {
    return this.makeRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Utility method to get remaining time for reset code
  getResetCodeTimeRemaining(email) {
    try {
      if (typeof window === 'undefined' || !window.sessionStorage) return 0;
      
      const resetCodes = JSON.parse(sessionStorage.getItem('resetCodes') || '{}');
      const resetData = resetCodes[email];
      
      if (!resetData) return 0;
      
      const timeRemaining = Math.max(0, resetData.expiresAt - Date.now());
      return Math.floor(timeRemaining / 1000); // Return seconds
    } catch (error) {
      console.error('Error getting reset code time:', error);
      return 0;
    }
  }
}

export default new ApiService();