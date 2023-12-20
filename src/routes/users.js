import express from "express";

import {
         ADD_USER, LOGIN} from "../controllers/users.js";


const router = express.Router();


router.post('/user',  ADD_USER);
router.post('/user/login', LOGIN);



  export default router;