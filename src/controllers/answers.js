// import mongoose from 'mongoose';
// import AnswerModel from '../models/answer.js';
// import QuestionModel from '../models/question.js';

// const ADD_ANSWER = async (req, res) => {
//     try {
//       const { id } = req.params; // Gauname klausimo ID iš route parametrų
//       const { answer_text } = req.body; // Gauname atsakymo tekstą iš užklausos kūno
  
//       // Tikriname, ar klausimas su tokiu ID egzistuoja
//       const existingQuestion = await QuestionModel.findById(id);
//       if (!existingQuestion) {
//         return res.status(404).json({ message: 'Klausimas nerastas' });
//       }
  
//       // Inicializuojame answers lauką kaip tuščią masyvą, jei jis dar nėra apibrėžtas
//       existingQuestion.answers = existingQuestion.answers || [];
  
//       // Sukuriame naują atsakymą naudodami AnswerModel
//       const newAnswer = new AnswerModel({
//         answer_text,
//       });
  
//       // Išsaugome naują atsakymą
//       const savedAnswer = await newAnswer.save();
  
//       // Pridedame naują atsakymą į klausimo atsakymų sąrašą
//       existingQuestion.answers.push(savedAnswer);
  
//       // Išsaugome atnaujintą klausimą su nauju atsakymu
//       const updatedQuestion = await existingQuestion.save();
  
//       return res.status(201).json({ response: updatedQuestion });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Klaida pridedant atsakymą' });
//     }
//   };

// const DELETE_ANSWER = async (req, res) => {
//   try {
//     const { id, answerId } = req.params; // Gauname klausimo ID ir atsakymo ID iš route parametrų

//     // Tikriname, ar klausimas su tokiu ID egzistuoja
//     const existingQuestion = await QuestionModel.findById(id);
//     if (!existingQuestion) {
//       return res.status(404).json({ message: 'Klausimas nerastas' });
//     }

//     // Filtruojame atsakymus ir paliekame tik tuos, kurių ID nesutampa su trinamu atsakymu
//     existingQuestion.answers = existingQuestion.answers.filter(
//       (answer) => answer._id.toString() !== answerId
//     );

//     // Išsaugome atnaujintą klausimą be trinamo atsakymo
//     const updatedQuestion = await existingQuestion.save();

//     return res.status(200).json({ response: updatedQuestion });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Klaida trinant atsakymą' });
//   }
// };

// export { ADD_ANSWER, DELETE_ANSWER , GET_ANSWER};


// controllers/answers.js
import mongoose from 'mongoose';
import AnswerModel from '../models/answer.js';
import QuestionModel from '../models/question.js';

const ADD_ANSWER = async (req, res) => {
  try {
    const { id } = req.params; // Gauname klausimo ID iš route parametrų
    const { answer_text } = req.body; // Gauname atsakymo tekstą iš užklausos kūno

    // Tikriname, ar klausimas su tokiu ID egzistuoja
    const existingQuestion = await QuestionModel.findById(id);
    if (!existingQuestion) {
      return res.status(404).json({ message: 'Klausimas nerastas' });
    }

    // Inicializuojame answers lauką kaip tuščią masyvą, jei jis dar nėra apibrėžtas
    existingQuestion.answers = existingQuestion.answers || [];

    // Sukuriame naują atsakymą naudodami AnswerModel
    const newAnswer = new AnswerModel({
      answer_text,
      question_id: existingQuestion._id,
    });

    // Išsaugome naują atsakymą
    const savedAnswer = await newAnswer.save();

    // Pridedame naują atsakymą į klausimo atsakymų sąrašą
    existingQuestion.answers.push(savedAnswer);

    // Išsaugome atnaujintą klausimą su nauju atsakymu
    const updatedQuestion = await existingQuestion.save();

    return res.status(201).json({ response: updatedQuestion });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Klaida pridedant atsakymą' });
  }
};

const DELETE_ANSWER = async (req, res) => {
  try {
    const { id } = req.params; // Gauname atsakymo ID iš route parametrų

    // Tikriname, ar atsakymas su tokiu ID egzistuoja
    const existingAnswer = await AnswerModel.findById(id);
    if (!existingAnswer) {
      return res.status(404).json({ message: 'Atsakymas nerastas' });
    }

    // Ištriname atsakymą
    const deletedAnswer = await AnswerModel.deleteOne({ _id: id });

    return res.status(200).json({ response: deletedAnswer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Klaida trinant atsakymą' });
  }
};



const GET_ANSWER = async (req, res) => {
  try {
    const { id } = req.params; // Gauname klausimo ID iš route parametrų

    // Tikriname, ar klausimas su tokiu ID egzistuoja
    const existingQuestion = await QuestionModel.findById(id);
    if (!existingQuestion) {
      return res.status(404).json({ message: 'Klausimas nerastas' });
    }

    // Gauname visus atsakymus priklausančius šiam klausimui
    const answers = await AnswerModel.find({ question_id: existingQuestion._id });

    return res.status(200).json({ response: answers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Klaida gaunant atsakymus' });
  }
};

export { ADD_ANSWER, DELETE_ANSWER, GET_ANSWER };
