import styles from "../../styles/Comment.module.css";
import { postDateTimeFormat } from "../../utils/format";

const Comment = ({ cmt, className, canDelete, onDelete, ...rest }) => {
  return (
    <div className={`${styles.comment} ${className}`} {...rest}>
      <p>
        {cmt.name} [{postDateTimeFormat(cmt.date)}]
      </p>
      <p className={styles.commentContent}>{cmt.comment}</p>
      <p onClick={onDelete} className={styles.delete}>Delete Comment</p>
    </div>
  );
};

export default Comment;
