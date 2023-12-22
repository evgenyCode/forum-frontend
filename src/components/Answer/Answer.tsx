// components/Answer/Answer.tsx
import React from 'react';

export type AnswerType = {
  _id: string;
  answer_text: string;
  date: string;
  gained_likes_number: number;
  question_id: string;
  user_id?: string; // Pakeičiama į neprivalomą lauką
};

type AnswerProps = {
  answer: AnswerType;
};

export const Answer: React.FC<AnswerProps> = ({ answer }) => {
  // Sukurkite naują Date objektą su atsakymo datos string reikšme
  const answerDate = new Date(answer.date);

  // Paimkite metus, mėnesį ir dieną iš Date objekto
  const year = answerDate.getFullYear();
  const month = answerDate.getMonth() + 1; // Mėnesiai prasideda nuo 0, todėl pridedame 1
  const day = answerDate.getDate();

  return (
    <div>
      <p><h3>{answer.answer_text}</h3></p>
      <p>Date: {`${year}-${month}-${day}`}</p>
   
      {/* Galite pridėti kitus laukus, jei jie egzistuoja */}
    </div>
  );
};

export default Answer;
