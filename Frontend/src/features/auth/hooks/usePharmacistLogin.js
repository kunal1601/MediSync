import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Controller Hook: Coordinates Pharmacist Login data interactions.
 * Routes directly to the designated staff dashboard workspace.
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

    // Frontend API response simulation
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (formData.login && formData.password) {
      // Transition strictly to the Pharmacist dashboard track
      navigate('/dashboard/pharmacist');
    } else {
      setError('Invalid Pharmacist credentials. Please try again.');
    }
    setIsLoading(false);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    error,
  };
};