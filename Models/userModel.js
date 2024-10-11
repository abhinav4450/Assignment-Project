import mongoose from "mongoose";

const user_Schema = new mongoose.Schema({
  user_Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  }
});
const User = mongoose.model("User", user_Schema);
export default User;
