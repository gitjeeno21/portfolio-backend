import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  status: { type: String, enum: ["unread", "read"], default: "unread" }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
 
