import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usertype: { 
    type: String, 
    enum: ['mover', 'user'], // Restrict to 'mover' or 'user'
    required: true 
  }
});

export const User = mongoose.model('user', userSchema);
