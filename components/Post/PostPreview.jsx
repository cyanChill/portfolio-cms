import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/PostPreview.module.css";
import { postDateFormat } from "../../utils/format";

const PostPreview = ({ postData }) => {
  const router = useRouter();

  return (
    <div className={styles.postCard}>
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

      <p className={styles.date}>{postDateFormat(postData.date)}</p>
    </div>
  );
};

export default PostPreview;
