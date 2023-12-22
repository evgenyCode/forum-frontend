import React, { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import styles from './Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const savedCookie = cookie.get('jwt_token');

    if (savedCookie) {
      setUserLoggedIn(true);
    }
  }, []);

  const router = useRouter();

  const onLogout = () => {
    cookie.remove('jwt_token');
    router.push('/login');
  };

  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href="/">
        <div className={styles.logo}>
          <h2>StackUnderFlow</h2>
        </div>
      </Link>
      <nav className={styles.navbar}>
        <li>
          <Link className={styles.link} href="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className={styles.link} href="/registration">
            Registration
          </Link>
        </li>
        <li>
          <Link className={styles.link} href="/add-question">
            Add Question
          </Link>
        </li>
        {isUserLoggedIn && (
          <li>
            <button onClick={onLogout}>Log out</button>
          </li>
        )}
      </nav>
    </div>
  );
};

export default Header;
