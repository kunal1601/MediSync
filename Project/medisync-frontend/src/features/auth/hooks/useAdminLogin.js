import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed or imported from your axios instance

export const useAdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: '',
    password: '',
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Real API Authentication Handshake
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Send Login Payload to Spring Boot AuthController
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: formData.login, // Backend expects 'email'
        password: formData.password,
      });

      const { token, role, name, email } = response.data;

      // 2. Validate Role Authorization
      if (role !== 'ADMIN') {
        setError('Access denied. This portal is strictly for Admin personnel.');
        setIsLoading(false);
        return;
      }

      // 3. Store Real Auth Credentials in LocalStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);

      // 4. Navigate to Admin Dashboard
      navigate('/dashboard/admin');
    } catch (err) {
      // 5. Handle HTTP 401 Unauthorized or Connection Failures
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Unable to connect to MediSync server. Check if backend is running on port 8080.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Optional Mock SSO handler
  const handleGoogleSsoMock = () => {
    setError('Google SSO is currently disabled. Please sign in with email and password.');
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleGoogleSsoMock,
    isLoading,
    error,
  };
};