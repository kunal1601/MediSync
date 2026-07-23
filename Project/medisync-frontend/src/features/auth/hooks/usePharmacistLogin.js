import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Controller Hook: Coordinates Pharmacist Login data interactions.
 * Connects to Spring Boot backend and routes directly to the designated staff workspace.
 */
export const usePharmacistLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: '',
    password: '',
    rememberMe: false,
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Real Backend API Authentication Handshake
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Post credentials to Spring Boot AuthController
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: formData.login, // 🌟 Updated: Backend expects 'username'
        password: formData.password,
      });

      const { token, role, username, id } = response.data;

      // 2. Validate Role Authorization
      if (role !== 'ROLE_PHARMACIST') { // 🌟 Updated: Matches 'ROLE_PHARMACIST' format
        setError('Access denied. This portal is strictly for Pharmacist personnel.');
        setIsLoading(false);
        return;
      }

      // 3. Store Real Auth Credentials in LocalStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userName', username);
      localStorage.setItem('userId', id);

      // 4. Navigate to Pharmacist Workspace / Dashboard
      navigate('/dashboard/pharmacist');
    } catch (err) {
      // 5. Handle Unauthorized or Network Failures
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError('Unable to connect to MediSync server. Check if backend is running on port 8080.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    error,
  };
};