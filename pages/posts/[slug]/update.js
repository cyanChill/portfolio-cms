import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "../../../styles/CreatePost.module.css";
import { customToast } from "../../../utils/customToast"
import PostForm from "../../../components/Post/PostForm";

const PostUpdatePage = ({ post: jsonPost }) => {
  const router = useRouter();

  const [post, setPost] = useState(null);

  const handleUpdate = async (title, slug, excerpt, thumbnailUrl, content, isPublished) => {
    try {
      const res = await fetch(`/api/posts/${post._id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({title, slug, excerpt, thumbnailUrl, content, isPublished})
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/');
      } else {
        // Something went wrong
        data.errors.map(err => customToast('error', err.message)) 
      }
    } catch(err) {
      customToast('error', "Something went wrong.")
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${post.slug}/`, { method: "DELETE" });

      if (res.ok) {
        customToast('success', "Succesfully deleted post.");
        router.replace('/');
      } else {
        customToast('error', "Failed to delete post.");
      }
    } catch(err) {
      customToast('error', "Something went wrong.")
    }
  }

  useEffect(() => {
    setPost(JSON.parse(jsonPost));
  }, [jsonPost]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <h1>Update Post</h1>
      <PostForm onSubmit={handleUpdate} postData={post} onDelete={handleDelete} />
    </div>
  );
};

export default PostUpdatePage;

// Server-side code
import { getSinglePost } from "../../../utils/services";

export const getServerSideProps = async (context) => {
  const params = context.params;
  const post = await getSinglePost(params.slug);
  if (post.length === 0) return { notFound: true };

  // We'll try to re-generate the page at most once an hour
  return { props: { post: JSON.stringify(post[0]) } };
};
