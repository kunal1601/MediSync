import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Controller Hook: Coordinates Login visual state and local form validation.
 */
export const useAdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Frontend performance simulation
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (formData.login && formData.password) {
      // Transition directly to the dashboard track
      navigate('/dashboard/owner');
    } else {
      setError('Please enter valid credentials.');
    }
    setIsLoading(false);
  };

  const handleGoogleSsoMock = () => {
    console.log('Initiating Google SSO Flow (Mock)');
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