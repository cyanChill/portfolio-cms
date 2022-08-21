import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import parse from "html-react-parser";

import styles from "../../../styles/PostDetail.module.css";
import { customToast } from "../../../utils/customToast";
import { postDateTimeFormat } from "../../../utils/format";
import FormButton from "../../../components/FormElements/FormButton";
import StyledInput from "../../../components/FormElements/StyledInput";
import Comment from "../../../components/Comment/Comment";

const PostDetailPage = ({ post: jsonPost }) => {
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const getComments = async () => {
    try {
      const res = await fetch(`/api/posts/${post._id}/comments`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      customToast("error", "Something went wrong.");
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/posts/${post._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, comment }),
      });
      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, data.comment]);
        setName("");
        setEmail("");
        setComment("");
      } else {
        // Something went wrong
        data.errors.map((err) => customToast("error", err.message));
      }
    } catch (err) {
      customToast("error", "Something went wrong.");
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });

      if (res.ok) {
        setComments((prev) => prev.filter((cmt) => cmt._id !== id));
      } else {
        customToast("error", "Failed to delete comment.");
      }
    } catch (err) {
      customToast("error", "Something went wrong.");
    }
  };

  useEffect(() => {
    setPost(JSON.parse(jsonPost));
  }, [jsonPost]);

  useEffect(() => {
    if (post && post._id) getComments();
  }, [post]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.postWrapper}>
        <header className={styles.postHeader}>
          <h1>{post.title}</h1>
          <p>{postDateTimeFormat(post.date)}</p>
        </header>

        <div className={styles.thumbnail}>
          <Image
            src={post.thumbnailUrl}
            alt=""
            width="200"
            height="200"
            layout="responsive"
            objectFit="cover"
            priority
          />
        </div>

        <div className={styles.postContent}>{parse(post.content)}</div>
      </div>

      <div className={styles.actions}>
        <FormButton onClick={() => router.push(`/posts/${post.slug}/update`)}>
          <span>Update Post</span>
        </FormButton>
      </div>

      <div className={styles.line} />

      <div className={styles.commentFormContainer}>
        <h2>Post a comment</h2>
        <form onSubmit={submitComment} className={styles.form}>
          <StyledInput
            type="textarea"
            placeholder="Comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <div className={styles.formGroup}>
            <StyledInput
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <StyledInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <FormButton
            type="submit"
            altBdr
            style={{
              "--btn-theme": "hsl(var(--black-700))",
              "--btn-alt-theme": "hsl(var(--off-white))",
            }}
          >
            <span>Submit Comment</span>
          </FormButton>
        </form>
      </div>

      <div className={styles.line} />

      {comments.length > 0 && (
        <div className={styles.commentContainer}>
          {comments.map((cmt) => (
            <Comment
              key={cmt._id}
              cmt={cmt}
              canDelete
              onDelete={() => deleteComment(cmt._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;

// Server-side code
import { getPosts, getSinglePost } from "../../../utils/services";

export const getStaticProps = async (context) => {
  const params = context.params;
  const post = await getSinglePost(params.slug);
  if (post.length === 0) return { notFound: true };

  // We'll try to re-generate the page at most once an hour
  return { props: { post: JSON.stringify(post[0]) }, revalidate: 60 * 60 };
};

export const getStaticPaths = async () => {
  const posts = await getPosts();
  const paths = posts.map((pst) => ({ params: { slug: pst.slug } }));

  // Prerender existing paths at build-time; allows the server to render
  // paths on demand with { fallback: "blocking" }
  return { paths: paths, fallback: "blocking" };
};
