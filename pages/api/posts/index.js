import { isValidHttpUrl } from "../../../utils/validate";
import dbConnect from "../../../utils/mongoConfig";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await GetPosts(req, res);
      return;

    case "POST":
      await CreatePost(req, res);
      return;

    default:
      res.status(405).json({ message: "Method is not supported." });
      return;
  }
}

const GetPosts = async (req, res) => {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ date: -1 });

    res.status(201).json({
      message: "Successfully found post.",
      posts: posts,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to find posts." });
  }
};

const CreatePost = async (req, res) => {
  await dbConnect();

  const { title, excerpt, thumbnailUrl, content, isPublished } = req.body;
  const slug = encodeURIComponent(req.body.slug)

  // Input validation
  const errors = [];
  if (title.trim().length === 0) {
    errors.push({ message: "Title must be nonempty." });
  }
  if (content.trim().length === 0) {
    errors.push({ message: "Content must be nonempty." });
  }
  if (!isValidHttpUrl(thumbnailUrl)) {
    errors.push({ message: "Thumbnail url must be a valid url." });
  }
  const existingSlug = await Post.findOne({ slug: slug });
  if (existingSlug) {
    errors.push({ message: "Slug has been used previously." });
  }
  if (errors.length !== 0) {
    res.status(406).json({ message: "Errors found with input.", errors });
    return;
  }

  try {
    const newPost = await Post.create({
      title,
      slug,
      thumbnailUrl,
      excerpt: excerpt || "",
      content,
      date: Date.now(),
      isPublished,
    });

    res.status(201).json({
      message: "Successfully created post.",
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create post." });
  }
};
