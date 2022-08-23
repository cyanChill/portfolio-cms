import { isValidHttpUrl } from "../../../../utils/validate";
import dbConnect from "../../../../utils/mongoConfig";
import Post from "../../../../models/Post";
import Comment from "../../../../models/Comment";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      await UpdatePost(req, res);
      return;

    case "DELETE":
      await DeletePost(req, res);
      return;

    default:
      res.status(405).json({ message: "Method is not supported." });
      return;
  }
}

const UpdatePost = async (req, res) => {
  await dbConnect();

  const { postId } = req.query;
  const { title, excerpt, thumbnailUrl, content, isPublished } = req.body;
  const slug = encodeURIComponent(req.body.slug);

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
  const existingSlug = await Post.findOne({ _id: { $ne: postId }, slug: slug });
  if (existingSlug) {
    errors.push({ message: "Slug has been used previously." });
  }
  if (errors.length !== 0) {
    res.status(406).json({ message: "Errors found with input.", errors });
    return;
  }

  try {
    const prevPostVersion = await Post.findById(postId);
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        slug,
        thumbnailUrl,
        excerpt: excerpt || "",
        content,
        isPublished,
        // If we're making this published from unpublished, set a new date
        date:
          !prevPostVersion.isPublished && isPublished
            ? Date.now()
            : prevPostVersion.date,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully updated post.",
      post: updatedPost,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update post." });
  }
};

const DeletePost = async (req, res) => {
  try {
    await dbConnect();
    await Promise.all([
      Post.findByIdAndDelete(req.query.postId),
      Comment.deleteMany({ postId: req.query.postId }),
    ]);
    res.status(200).json({ message: "Successfully deleted post." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post." });
  }
};
