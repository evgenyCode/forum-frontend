// import  Jwt  from "jsonwebtoken";


// const authUser = (req, res, next)=>{
//     const token = req.headers.authorization;
   

//     if(!token){
//         return res.status(401).json({message: "Bad auth!!!"})
//     }

//     Jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
//         if(err){
//             return res.status(401).json({message: "Bad auth!!!"})
//         }

//         req.body.userID = decoded.id
//         return next();
//     })

   

// }



// export default authUser

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Bad auth!!!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Gauti vartotojo informaciją pagal ID
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Vartotojas nerastas' });
    }

    // Pridėti vartotojo informaciją į req objektą
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Bad auth!!!' });
  }
};

export default authUser;

