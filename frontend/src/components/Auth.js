import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/api';

function Auth({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isRegister) {
        response = await registerUser(username, password);
      } else {
        response = await loginUser(username, password);
      }
      console.log(response.data);
      setToken(response.data.token); // Store the token in state or localStorage
    } catch (error) {
      console.error('Error during authentication:', error.response.data);
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'Need to register?'}
      </button>
    </div>
  );
}

export default Auth;