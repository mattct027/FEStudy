import React, { useState } from 'react';
import './Login.css';  // Import the CSS file
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Create the login data
    const loginData = {
      username: username,
      password: password,
    };

    try {
      // Send a POST request to the Flask backend using fetch
      const response = await fetch('http://127.0.0.1:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), // Send the data as a JSON string
      });

      // Check if the response is OK (status 200)
      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Login successful');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Login failed');
      }
    } catch (error) {
      // Handle errors such as network issues
      alert('Error: Unable to connect to the server');
    }
  };

  return (
    <div className="login-container">
        <div className="circle-container">
        <img src="stonesleep.png" alt="Profile Picture" className="circle-img" />
      </div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit">Submit</button>
        </form>
        <p className="signup-text">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
