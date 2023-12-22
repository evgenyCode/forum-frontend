import React from 'react';
import Answer from '../Answer/Answer'; 
import styles from './Question.module.css';

type QuestionProps = {
  question: {
    _id: string;
    question_title: string;
    question_text: string;
    date: string;
    user_id: string;
    answers: any[]; 
  };
};

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className={styles.question}>
      {question.question_title}
      <p>{question.question_text}</p>
      <p>Date: {question.date}</p>
     

      <div className={styles.answers}>
        {question.answers && question.answers.map((answer) => (
          <Answer key={answer._id} answer={answer} />
        ))}
      </div>
    </div>
  );
};

export default Question;

