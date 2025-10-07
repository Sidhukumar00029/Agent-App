import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      await authService.login(userData);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      // We will handle displaying errors to the user later
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={onChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;