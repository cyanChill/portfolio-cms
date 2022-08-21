import { useRouter } from "next/router";

import styles from "../../styles/CreatePost.module.css";
import { customToast } from "../../utils/customToast";
import PostForm from "../../components/Post/PostForm";

const CreatePostPage = () => {
  const router = useRouter();

  const handleSubmit = async (title, slug, excerpt, thumbnailUrl, content, isPublished) => {
    try {
      const res = await fetch('/api/posts', {
        method: "POST",
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

  return (
    <div className={styles.wrapper}>
      <h1>Create a Bew Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePostPage;
