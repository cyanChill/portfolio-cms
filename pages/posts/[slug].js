import { useState, useEffect } from "react";
import Image from "next/image";
import parse from "html-react-parser";

import styles from "../../styles/PostDetail.module.css";
import { postDateTimeFormat } from "../../utils/format";

const PostDetailPage = ({ post: jsonPost }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    setPost(JSON.parse(jsonPost));
  }, [jsonPost]);

  if (!post) return <div>Loading...</div>;

  return (
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
  );
};

export default PostDetailPage;

// Server-side code
import { getPosts, getSinglePost } from "../../utils/services";

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
