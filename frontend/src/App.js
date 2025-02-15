import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'; // Assuming your styles are in App.css
import Login from './Login'; // Import the Login component
import Signup from './Signup'; // Import the Signup component (you can create this later)

function App() {
  const navigate = useNavigate();  // useNavigate hook to programmatically navigate

  const handleSignup = () => {
    navigate('/signup');  // Navigate to the Signup page
  };

  const handleLogin = () => {
    navigate('/login');  // Navigate to the Login page
  };

  return (
    <div className="landing-page">
      <h1>FEStudy</h1>
      <div className="circle-container">
        <img src="zane.png" alt="Profile Picture" className="circle-img" />
      </div>
      <div className="auth-buttons">
        <button onClick={handleSignup}>Signup</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />  {/* Landing Page */}
        <Route path="/Login" element={<Login />} />  {/* Login Page */}
        /*<Route path="/Signup" element={<Signup />} />  {/* Signup Page */}*/
      </Routes>
    </Router>
  );
}

export default Main;
