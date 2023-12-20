import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({

  question_title: {
    type: String,
    required: true
  },
  question_text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  }
});

export default mongoose.model("Question",questionSchema )

