import React from 'react';
import styles from './Questions.module.css';

export type QuestionType = {
  _id: string;
  question_title: string;
  question_text: string;
  date: string;
  user_id: {
    _id: string;
    fullName: string;
  };
};

type QuestionsProps = {
  questions: QuestionType[] | null;
  onQuestionClick: (questionId: string) => void; 
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return formattedDate;
};

const Questions: React.FC<QuestionsProps> = ({ questions, onQuestionClick }) => {
  return (
    <div className={styles.wrapper}>
      {questions && questions.map((question) => (
        <div key={question._id} className={styles.question} onClick={() => onQuestionClick(question._id)}>
          <div><h1>{question.question_title}</h1></div>
          <div><h4>{question.question_text}</h4></div>
          <div>Date: {formatDate(question.date)}</div>
        </div>
      ))}
    </div>
  );
};

export default Questions;
