import dbConnect from "./mongoConfig";
import Post from "../models/Post";

export const getPosts = async () => {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ date: -1 });
    return posts;
  } catch (err) {
    throw new Error("Failed to get posts.");
  }
};

export const getSinglePost = async (slug) => {
  try {
    await dbConnect();
    const post = await Post.find({ slug: slug });
    return post;
  } catch (err) {
    throw new Error("Failed to get posts.");
  }
};
