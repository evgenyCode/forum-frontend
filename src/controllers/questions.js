import mongoose from "mongoose";
import QuestionModel from "../models/question.js"
import UserModel from "../models/user.js"
// import auth from '../middleware/auth.js';

const ADD_QUESTION = async (req, res) => {
  try {

    const user = await UserModel.findOne({ userID: req.body.userID });

    if (!user) {
      return res.status(404).json({ message: 'Vartotojas nerastas' });
    }

    // Sukurti klausimą su vartotojo user_id
    const question = new QuestionModel({
      question_title: req.body.question_title,
      question_text: req.body.question_text,
      date: new Date(),
      user_id: new mongoose.Types.ObjectId(user._id),

    });

  const response =await question.save();

   return res.status(201).json({response: response});
}catch(err){ 
  console.log(err);
  return res.status(500).json({message: "Error happened"});
  

}
  };

const DELETE_QUESTION = async (req, res) => {
  // Čia taip pat turėtumėte pridėti authMiddleware, jei norite tikrinti autentifikaciją šioje vietoje
  try {
    const response = await QuestionModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error happened' });
  }
};

const GET_QUESTIONS = async (req, res) =>  {
    
  
  const questions =await QuestionModel.find();

   return res.status(200).json({questions: questions});
  };

export { ADD_QUESTION, DELETE_QUESTION, GET_QUESTIONS };