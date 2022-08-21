import dbConnect from "../../../../utils/mongoConfig";
import Comment from '../../../../models/Comment'

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await GetComments(req, res);
      return;

    case "POST":
      await AddComment(req, res);
      return;

    default:
      res.status(405).json({ message: "Method is not supported." });
      return;
  }
}

const GetComments = async (req, res) => {
  try {
    await dbConnect();
    const comments = await Comment.find({ postId: req.query.postId });
    res.status(200).json({
      message: "Successfully found comments for post.",
      comments: comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to find comments for post." });
  }
};

const AddComment = async (req, res) => {
  await dbConnect();

  const { name, email, comment } = req.body;

  // Input validation
  const errors = [];
  if (name.trim().length === 0) {
    errors.push({ message: "Name must be nonempty." });
  }
  if (comment.trim().length === 0) {
    errors.push({ message: "Comment must be nonempty." });
  }
  if (errors.length !== 0) {
    res.status(406).message({ message: "Errors found with input.", errors });
    return;
  }

  try {
    const newComment = await Comment.create({
      postId: req.query.postId,
      name,
      email,
      comment,
      date: Date.now(),
    });

    res.status(201).json({
      message: "Successfully created comment.",
      comment: newComment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create comment." });
  }
};
