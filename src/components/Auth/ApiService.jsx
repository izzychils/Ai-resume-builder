// import emailjs from '@emailjs/browser';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
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

    const token = localStorage.getItem('authToken');
    if (token && !token.startsWith('mock-')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        throw new Error(
          (data && data.detail) || data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error.message);
      throw new Error(error.message || 'API request failed');
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
      body: JSON.stringify({ id_token: idToken }),
    });
  }

  // Send password reset code (backend handles email)
  async sendPasswordResetCode(email) {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Please provide a valid email address');
    }

    return this.makeRequest('/auth/send-reset-code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Verify code (via backend)
  async verifyPasswordResetCode(email, code) {
    if (!email || !code) {
      throw new Error('Email and verification code are required');
    }

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      throw new Error('Please enter a valid 6-digit code');
    }

    return this.makeRequest('/auth/verify-reset-code', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  // Reset password
  async resetPassword(email, code, newPassword) {
    if (!email || !code || !newPassword) {
      throw new Error('Email, verification code, and new password are required');
    }

    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    return this.makeRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        email,
        verification_code: code,
        new_password: newPassword,
      }),
    });
  }

  // User profile
  async getUserProfile() {
    return this.makeRequest('/users/profile');
  }

  async updateUserProfile(userData) {
    return this.makeRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }
}

export default new ApiService();
