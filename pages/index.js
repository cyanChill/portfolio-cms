import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import styles from "../styles/Home.module.css";
import PostPreview from "../components/Post/PostPreview";

const Home = () => {
  const { status } = useSession();

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts || []);
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
      {posts.map((post) => (
        <PostPreview key={post._id} postData={post} />
      ))}
    </div>
  );
};

export default Home;
