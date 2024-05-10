import React, { useState , useContext } from 'react';
import axios from 'axios';
import './component.css';
import AuthContext from './AuthProvider';

export default function Login() {
  const { setRole, setIsLoggedIn, setToken } = useContext(AuthContext);
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/Login', {
        gmail,
        password,
      });

      const role1 = response.data.check1;
      setToken(response.data.token)
      setIsLoggedIn(true);
      setRole(role1);
      alert('Bạn đã đăng nhập thành công');
      console.log(setIsLoggedIn,setRole);
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Thông tin đăng nhập sai');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder='Email'
        type="email"
        onChange={(e) => setGmail(e.target.value)}
      />
      <input
        placeholder='Password'
        type="password" // Use type "password" for password input
        onChange={(e) => setPassword(e.target.value)}
      />
      <a href="">Forgot password</a>
      <button type="submit">Đăng nhập</button>
      <p>Don't have an account?<a href="">Signup</a></p>
      <p>Or</p>
      <button className='withLogin'>Login with Facebook</button>
      <button className='withLogin' id='withgoogle'>Login with Google</button>
    </form>
  );
}
