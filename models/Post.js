import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  isPublished: { type: Boolean, default: false, required: true },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
