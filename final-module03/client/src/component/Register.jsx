import React, { useState } from 'react';
import axios from 'axios';
import './component.css'; // Đảm bảo rằng bạn có một file CSS phù hợp

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handlePasswordMatch = () => {
    if (password != confirmPassword) {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Mật khẩu không khớp.' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePasswordMatch();

    if (Object.values(errors).some(error => error)) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/register', {
        email,
        password,
      });

      console.log(response.data);
      alert('Đăng ký thành công!');
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Đã xảy ra lỗi khi đăng ký!');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder='Email'
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          placeholder='Password'
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          placeholder='Confirm Password'
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" className='register'>Register</button>
        <p>Already have an account? <a href="">Login</a></p>
        <p>Or</p>
        <button className='withLogin'>Login with Facebook</button>
        <button className='withLogin' id='withgoogle'>Login with Google</button>
      </form>
    </>
  );
}
