// import express from 'express';
// import auth from '../middleware/auth.js';
// import { ADD_ANSWER, DELETE_ANSWER, GET_ANSWER, } from '../controllers/answers.js';

// const router = express.Router();

// router.post('/question/:id/answers', auth, ADD_ANSWER); // Pridėti atsakymą
// router.delete('/answer/:id/', auth, DELETE_ANSWER); // Ištrinti atsakymą
// router.get('/question/:id/answers', GET_ANSWER);

// export default router;

import express from 'express';
import auth from '../middleware/auth.js';
import { ADD_ANSWER, DELETE_ANSWER, GET_ANSWER } from '../controllers/answers.js';

const router = express.Router();

router.post('/question/:id/answers', auth, ADD_ANSWER); // Pridėti atsakymą
router.delete('/answer/:id', auth, DELETE_ANSWER); // Ištrinti atsakymą
 // Ištrinti atsakymą
router.get('/question/:id/answers', GET_ANSWER); // Gauk atsakymus pagal klausimo ID

export default router;


