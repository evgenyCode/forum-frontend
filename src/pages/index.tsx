// import React from 'react';
// import axios from 'axios';
// import Questions from '../components/Questions/Questions';
// import PageTemplate from '@/components/PageTemplates/PageTemplate';
// import { useRouter } from 'next/router';


// const Index = () => {
//   const [questions, setQuestions] = React.useState<any[] | null>(null);
//   const router = useRouter();

//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.get(`${process.env.SERVER_URL}/questions`);
//       setQuestions(response.data.questions);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   React.useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const onQuestionClick = (questionId: string) => {
//     router.push(`/question/${questionId}`);
//   };

//   return (
//     <PageTemplate>
//       <Questions questions={questions} onQuestionClick={onQuestionClick} />
      
//     </PageTemplate>
//   );
// };

// export default Index;

// pages/index.tsx
import React from 'react';
import axios from 'axios';
import Questions from '../components/Questions/Questions';
import PageTemplate from '@/components/PageTemplates/PageTemplate';
import { useRouter } from 'next/router';


const Index = () => {
  const [questions, setQuestions] = React.useState<any[] | null>(null);
  const router = useRouter();

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/questions`);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  React.useEffect(() => {
    fetchQuestions();
  }, []);

  const onQuestionClick = (questionId: string) => {
    router.push(`/question/${questionId}`);
  };

  return (
    <PageTemplate>
      <Questions questions={questions} onQuestionClick={onQuestionClick} />
      
    </PageTemplate>
  );
};

export default Index;

