import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';
import PageTemplate from '@/components/PageTemplates/PageTemplate';
import Answer from '@/components/Answer/Answer';
import styles from './styles.module.css';

type QuestionType = {
  _id: string;
  question_title: string;
  question_text: string;
  date: string;
  user_id: string;
  user: {
    _id: string;
    fullName: string;
    answers: any[];
  };
};

const QuestionDetails = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(null);
  const [answers, setAnswers] = useState<any[] | null>(null);
  const [newAnswer, setNewAnswer] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<boolean>(false); // Naujas state
  const router = useRouter();
  const { id } = router.query as { id?: string };

  useEffect(() => {
    const checkAuthentication = () => {
      const token = cookie.get('jwt_token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        if (id) {
          const response = await axios.get(`${process.env.SERVER_URL}/questions/${id}`);
          console.log('Fetched question by ID:', response.data.question);
          setSelectedQuestion(response.data.question);
          fetchAnswersForQuestion(id);
        }
      } catch (error) {
        console.error('Error fetching question by ID:', error);
      }
    };

    fetchQuestionAndAnswers();
  }, [id]);

  const fetchAnswersForQuestion = async (questionId: string) => {
    try {
      console.log('Fetching answers for question with ID:', questionId);
      const response = await axios.get(`${process.env.SERVER_URL}/question/${questionId}/answers`);
      setAnswers(response.data.response);
      console.log('Fetched answers:', response.data.response);
    } catch (error) {
      console.error('Error fetching answers by question ID:', error);
    }
  };

  const handleAddAnswer = async () => {
    try {
      if (!newAnswer || !selectedQuestion) {
        console.error('Naujas atsakymas negali būti tuščias, arba nėra pasirinktas klausimas.');
        return;
      }

      const response = await axios.post(
        `${process.env.SERVER_URL}/question/${selectedQuestion._id}/answers`,
        { answer_text: newAnswer },
        { headers: { authorization: cookie.get('jwt_token') } }
      );

      console.log('Response after adding answer:', response.data);

    
      fetchAnswersForQuestion(selectedQuestion._id);

    
      setNewAnswer('');
    } catch (error: any) {
      console.error('Error adding answer:', error.response || error.message || error);

      if (error.response && error.response.status === 401) {
       
        alert('Norint pridėti atsakymą, turite būti prisijungęs.');
      }
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      if (!selectedQuestion) {
        console.error('Nepasirinktas klausimas.');
        return;
      }

      
      const isConfirmed = window.confirm('Ar tikrai norite ištrinti klausimą?');

      if (isConfirmed) {
        const response = await axios.delete(
          `${process.env.SERVER_URL}/question/${selectedQuestion._id}`,
          { headers: { authorization: cookie.get('jwt_token') } }
        );

        console.log('Response after deleting question:', response.data);

        
        router.push('/');
      } else {
        
        setDeleteMessage(true);
      }
    } catch (error: any) {
      console.error('Error deleting question:', error.response || error.message || error);

      if (error.response && error.response.status === 401) {
        
        alert('Jūs nesate šio klausimo autorius ir negalite jo ištrinti.');
      }
    }
  };

  return (
    <PageTemplate>
      <div className={styles.wrapper}>
        {selectedQuestion && (
          <div className={styles.selectedQuestion}>
            <h1>{selectedQuestion.question_title}</h1>
            <p>
              <h3>{selectedQuestion.question_text}</h3>
            </p>
            <p>
              <h6>Date: {new Date(selectedQuestion.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}</h6>
            </p>

            {answers && (
              <div>
                <h2>Answers:</h2>
                {answers.map((answer) => (
                  <Answer key={answer._id} answer={answer} />
                ))}
              </div>
            )}

            <div>
              {/* Papildoma dalis, leidžianti ištrinti klausimą tik prisijungusiems vartotojams */}
              {isAuthenticated && (
                <div>
                  {!deleteMessage && (
                    <div>
                      <button onClick={handleDeleteQuestion}>Ištrinti klausimą</button>
                    </div>
                  )}
                  {deleteMessage && (
                    <div>
                      <p>Klausimo ištrynimas atšauktas.</p>
                    </div>
                  )}
                </div>
              )}

              <input
                type="text"
                placeholder="Įveskite naują atsakymą..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button onClick={handleAddAnswer}>Pridėti atsakymą</button>
            </div>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default QuestionDetails;
