import express from "express";
import  auth from '../middleware/auth.js'
import { ADD_QUESTION, 
         GET_QUESTIONS,
         DELETE_QUESTION,
          } from "../controllers/questions.js";

                 


const router = express.Router();


router.post('/questions',auth,  ADD_QUESTION);
router.get('/questions', GET_QUESTIONS);
router.delete('/question/:id',auth, DELETE_QUESTION);





  export default router;