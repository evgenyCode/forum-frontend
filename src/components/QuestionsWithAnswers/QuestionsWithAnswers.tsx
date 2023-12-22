// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Question from '../Question/Question';
// // import styles from './QuestionsWithAnswers.module.css';

// // type Props = {
// //   selectedQuestion: any; // Pakeiskite any į tikrąjį jūsų duomenų tipą (pvz., QuestionType)
// // };

// // const QuestionsWithAnswers: React.FC<Props> = ({ selectedQuestion }) => {
// //   const [questionsWithAnswers, setQuestionsWithAnswers] = useState<any[] | null>(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Pakeiskite šią dalį, kad būtų naudojamas selectedQuestion duomenys
// //         const response = await axios.get(`${process.env.SERVER_URL}/questionsAnswers`);
// //         setQuestionsWithAnswers(response.data.questions);
// //       } catch (error) {
// //         console.error('Error fetching questions with answers:', error);
// //       }
// //     };

// //     fetchData();
// //   }, [selectedQuestion]); // Papildykite dependencies masyvą pagal savo poreikius

// //   return (
// //     <div className={styles.wrapper}>
// //       {questionsWithAnswers && questionsWithAnswers.map((question) => (
// //         <Question key={question._id} question={question} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default QuestionsWithAnswers;


// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Question from '../Question/Question';
// // import styles from './QuestionsWithAnswers.module.css';

// // type Props = {
// //   selectedQuestion: any; // Pakeiskite any į tikrąjį jūsų duomenų tipą (pvz., QuestionType)
// // };

// // const QuestionsWithAnswers: React.FC<Props> = ({ selectedQuestion }) => {
// //   const [questionsWithAnswers, setQuestionsWithAnswers] = useState<any[] | null>(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         if (selectedQuestion) {
// //           // Jei yra pasirinktas klausimas, naudokime jo ID gauti klausimus su atsakymais
// //           const response = await axios.get(`${process.env.SERVER_URL}/questions/${selectedQuestion._id}/answers`);
// //           setQuestionsWithAnswers(response.data.answers);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching questions with answers:', error);
// //       }
// //     };

// //     fetchData();
// //   }, [selectedQuestion]);

// //   return (
// //     <div className={styles.wrapper}>
// //       {questionsWithAnswers && questionsWithAnswers.map((answer) => (
// //         // Pakeiskite šį div'ą pagal savo poreikius
// //         <div key={answer._id}>
// //           {/* Atvaizduokite atsakymo informaciją */}
// //           <p>{answer.answer_text}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default QuestionsWithAnswers;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Question from '../Question/Question';
// import styles from './QuestionsWithAnswers.module.css';

// type Props = {
//   selectedQuestionId: string | null;
// };

// const QuestionsWithAnswers: React.FC<Props> = ({ selectedQuestionId }) => {
//   const [questionsWithAnswers, setQuestionsWithAnswers] = useState<any[] | null>(null);
//   const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.SERVER_URL}/questionsAnswers`);
//         setQuestionsWithAnswers(response.data.questions);
//       } catch (error) {
//         console.error('Error fetching questions with answers:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Tikriname, ar yra pasirinktas klausimas ir atnaujiname jį pagal jo ID
//     if (selectedQuestionId && questionsWithAnswers) {
//       const foundQuestion = questionsWithAnswers.find((question) => question._id === selectedQuestionId);
//       setSelectedQuestion(foundQuestion || null);
//     } else {
//       setSelectedQuestion(null);
//     }
//   }, [selectedQuestionId, questionsWithAnswers]);

//   return (
//     <div className={styles.wrapper}>
//       {selectedQuestion ? (
//         // Atvaizduojame tik pasirinktą klausimą su atsakymais
//         <Question key={selectedQuestion._id} question={selectedQuestion} />
//       ) : (
//         // Atvaizduojame visus klausimus, jei nėra pasirinkto klausimo
//         questionsWithAnswers &&
//         questionsWithAnswers.map((question) => (
//           <Question key={question._id} question={question} />
//         ))
//       )}
//     </div>
//   );
// };

// export default QuestionsWithAnswers;
