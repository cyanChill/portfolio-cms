import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import styles from "../styles/Home.module.css";
import PostPreview from "../components/Post/PostPreview";

const Home = () => {
  const { status } = useSession();

  const [unpubPosts, setUnpubPosts] = useState([]);
  const [pubPosts, setPubPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();

      setUnpubPosts(data.posts.filter(pst => !pst.isPublished))
      setPubPosts(data.posts.filter(pst => pst.isPublished))
    } catch (err) {
      console.log("Something went wrong.");
    }
  };

  useEffect(() => {
    if (status === "authenticated") getPosts();
  }, [status]);

  if (status === "loading" || !status) return <div>Loading...</div>;

  return (
    <div className={styles.contentContainer}>
      <p>Unpublished Posts:</p>
      <div className={styles.postsContainer}>
        {unpubPosts.map((post) => (
          <PostPreview key={post._id} postData={post} />
        ))}
      </div>

      <p>Published Posts:</p>
      <div className={styles.postsContainer}>
        {pubPosts.map((post) => (
          <PostPreview key={post._id} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
