import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  isPublished: { type: Boolean, default: false, required: true },
});

const PostModel = model("Post", PostSchema);

export default PostModel;
