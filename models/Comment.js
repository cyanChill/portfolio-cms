import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
