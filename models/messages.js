import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  message_sid: String,
  from: String,
  to: String,
  message: String,
  name: String,
  time:String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});
const messages = mongoose.model("messages", messageSchema);
export default messages;
