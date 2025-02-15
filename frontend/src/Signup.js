import React, { useState } from 'react';
import './Login.css';  // Import the CSS file

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Create the login data
    const signupData = {
      username: username,
      password: password,
    };

    try {
      // Send a POST request to the Flask backend using fetch
      const response = await fetch('http://127.0.0.1:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData), // Send the data as a JSON string
      });

      // Check if the response is OK (status 200)
      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Signup successful');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Signup failed');
      }
    } catch (error) {
      // Handle errors such as network issues
      alert('Error: Unable to connect to the server');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignupSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
