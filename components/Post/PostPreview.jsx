import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/PostPreview.module.css";
import { postDateFormat } from "../../utils/format";
import PostInfo from "./PostInfo";

const PostPreview = ({ postData, className, style }) => {
  const router = useRouter();

  return (
    <div className={`${styles.postCard} ${className}`} style={style}>
      <div
        className={styles.thumbnail}
        onClick={() => router.push(`/posts/${postData.slug}`)}
      >
        <Image
          src={postData.thumbnailUrl}
          alt=""
          width="200"
          height="200"
          layout="responsive"
          objectFit="cover"
          priority
        />
      </div>

      <Link href={`/posts/${postData.slug}`}>
        <a className={styles.postTitle}>{postData.title}</a>
      </Link>

      <p className={styles.excerpt}>{postData.excerpt}</p>

      <PostInfo date={postDateFormat(postData.date)} spaceBetween />
    </div>
  );
};

export default PostPreview;
