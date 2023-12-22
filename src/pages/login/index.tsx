import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import PageTemplate from '@/components/PageTemplates/PageTemplate';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onLogin = async () => {
    try {
      const body = {
        email: email,
        password: password,
      };

      const response = await axios.post(`${process.env.SERVER_URL}/user/login`, body);

      if (response.status === 200) {
        cookie.set('jwt_token', response.data.token);
        router.push('/');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('Neteisingi prisijungimo duomenys. Bandykite dar kartą.');
      } else {
        setError('Įvyko klaida prisijungiant. Bandykite dar kartą vėliau.');
      }
    }
  };

  return (
    <PageTemplate>
      <div className={styles.form}>
        <input placeholder="Email:" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button onClick={onLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </PageTemplate>
  );
};

export default Login;
