import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import PageTemplate from '@/components/PageTemplates/PageTemplate';
import styles from './styles.module.css';

const RegistrationForm: React.FC = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const isEmailValid = (email: string): boolean => {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFullNameValid = (fullName: string): boolean => {
    
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    return fullNameRegex.test(fullName);
  };

  const handleRegister = async () => {
    try {
      if (!isFullNameValid(fullName)) {
        setError('Invalid name. Please use only letters and spaces.');
        return;
      }

      if (!isEmailValid(email)) {
        setError('Invalid email address.');
        return;
      }

      if (!password || password.length < 6) {
        setError('Password should be at least 6 characters long.');
        return;
      }

      const response = await axios.post(`${process.env.SERVER_URL}/user`, {
        fullName,
        email,
        password,
      });

      if (response.status === 200) {
        cookie.set('jwt_token', response.data.token);
        router.push('/');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.form}>
        <h2>Registration Form</h2>
        {/* <form> */}
          <input placeholder='Full name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input placeholder='Email:' value={email} onChange={(e) => setEmail(e.target.value)} />
         
          <input placeholder='Password:' value={password} onChange={(e) => setPassword(e.target.value)} />
          
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="button" onClick={handleRegister}>
            Register
          </button>
      </div>
    </PageTemplate>
  );
};

export default RegistrationForm;
