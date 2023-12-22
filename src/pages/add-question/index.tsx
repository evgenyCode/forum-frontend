import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from './styles.module.css';
import PageTemplate from '@/components/PageTemplates/PageTemplate';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/router';

const AddQuestion = () => {
  const [isLoading, setLoading] = useState(false);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
   
    const jwtToken = cookie.get('jwt_token');
    setAuthenticated(!!jwtToken);

   
    if (!jwtToken) {
      setShowLoginModal(true);
    }
  }, []);

  const onAddQuestion = async () => {
    try {
      
      if (!questionTitle || !questionText) {
        return;
      }

      setLoading(true);
      const body = {
        question_title: questionTitle,
        question_text: questionText,
      };

      const headers = {
        authorization: cookie.get('jwt_token'),
      };

      const response = await axios.post(`${process.env.SERVER_URL}/questions`, body, { headers });

      setLoading(false);

      if (response.status === 201) {
        router.push('/');
      }
    } catch (error) {
      console.error("Error adding question:", error);
      setLoading(false);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Add Question</h1>
        {isAuthenticated ? (
          <div className={styles.form}>
            <input
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder='Klausimo pavadinimas'
            />
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder='Klausimo tekstas'
            />
            <Button text="Add question" onClick={onAddQuestion} isLoading={isLoading} />
          </div>
        ) 
        : (
          <p className={styles.modalOverlay}>You are not logged in.</p>)
        }
      </div>

   
      {showLoginModal && (
        <div className={styles.modalOverlay}>
          <p>Please log in to add a question.</p>
          <div className={styles.modalContent}>
           
            <Button text="Log In" onClick={() => router.push('/login')} />
            <Button text="Close" onClick={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
    </PageTemplate>
  );
};

export default AddQuestion;
