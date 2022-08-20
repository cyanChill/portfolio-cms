import styles from "../../styles/FormButton.module.css";

const FormButton = ({ isLink, altBdr, className, children, ...rest }) => {
  if (isLink) {
    return (
      <a
        className={`${styles.btn} ${className} ${altBdr && styles.altBdr}`}
        {...rest}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        className={`${styles.btn} ${className} ${altBdr && styles.sameBdr}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
};

export default FormButton;
