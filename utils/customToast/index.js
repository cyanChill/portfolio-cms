import toast from "react-hot-toast";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

import styles from "./index.module.css";

export const customToast = (type, message) => {
  toast.custom(
    (t) => {
      return (
        <div
          className={`${
            t.visible ? styles.animateEnter : styles.animateLeave
          } ${styles.toastContainer}`}
        >
          <div className={styles.msgContainer}>
            {(type === "success" || type === "error") &&
              (type === "success" ? (
                <AiFillCheckCircle
                  className={styles.icon}
                  style={{ color: "hsl(var(--lime-400))" }}
                />
              ) : (
                <AiFillCloseCircle
                  className={styles.icon}
                  style={{ color: "hsl(var(--red-500))" }}
                />
              ))}
            <p>{message}</p>
          </div>

          <button
            onClick={() => toast.dismiss(t.id)}
            className={styles.closeBtn}
          >
            Close
          </button>
        </div>
      );
    },
    { duration: 5000 }
  );
};
