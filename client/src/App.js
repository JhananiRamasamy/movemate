import './App.css';
import React from 'react';
import RegistrationComponent from './components/RegistrationComponent';
import LoginComponent from './components/LoginComponent';
import { Routes, Route,Navigate  } from 'react-router-dom'; // Import Routes and Route correctly
import ProfileComponent from './components/ProfileComponent';


function App() {
  return (
   
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} /> 
   
    <Route path="/login" element={<LoginComponent />} /> {/* Make sure this is /login */}
    <Route path="/register" element={<RegistrationComponent />} />
    <Route path="/profile" element={<ProfileComponent />} />
        </Routes>
  );
}

export default App;
