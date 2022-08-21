import dbConnect from "../../../utils/mongoConfig";
import Comment from '../../../models/Comment'

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      await DeleteComment(req, res);
      return;

    default:
      res.status(405).json({ message: "Method is not supported." });
      return;
  }
}

const DeleteComment = async (req, res) => {
  try {
    await dbConnect();
    await Comment.findByIdAndDelete(req.query.commentId);
    res.status(200).json({ message: "Successfully deleted comment." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete comment." });
  }
};
