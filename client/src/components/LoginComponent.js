import { useState } from 'react';
import React from 'react';
import {  useNavigate } from "react-router-dom";


const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation Login($email: String!, $password: String!) {
              login(email: $email, password: $password){
              token
              }
            }
          `,
          variables: {
            email: formData.email,
            password: formData.password,
          },
        }),
      });

      const result = await response.json();
        alert(result)
      if (response.ok && result.data.login) {
        localStorage.setItem('token', result.data.login.token);
        alert('Login successful!');
        navigate('/profile');
      } else {
        alert('Login failed: ' + (result.errors ? result.errors[0].message : 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        required
      />
      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginComponent;
