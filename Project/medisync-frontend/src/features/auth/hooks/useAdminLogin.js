import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      // 1. Send Login Payload matching Spring Boot AuthController LoginRequestDTO
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: formData.login, // 🌟 Updated: Backend expects 'username'
        password: formData.password,
      });

      const { token, role, username, id } = response.data;

      // 2. Validate Role Authorization (Matching Spring Security GrantedAuthority)
      if (role !== 'ROLE_ADMIN') { // 🌟 Updated: Matches 'ROLE_ADMIN' format
        setError('Access denied. This portal is strictly for Admin personnel.');
        setIsLoading(false);
        return;
      }

      // 3. Store Real Auth Credentials in LocalStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userName', username);
      localStorage.setItem('userId', id);

      // 4. Navigate to Admin Dashboard
      navigate('/dashboard/admin');
    } catch (err) {
      // 5. Handle HTTP 401 Unauthorized or Connection Failures
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError('Unable to connect to MediSync server. Check if backend is running on port 8080.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Optional Mock SSO handler
  const handleGoogleSsoMock = () => {
    setError('Google SSO is currently disabled. Please sign in with username and password.');
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