import styles from "../../styles/StyledInput.module.css";

const StyledInput = ({ className, type, ...rest }) => {
  const inputClasses = `${styles.styledInput} ${className}`;

  if (type === "textarea") {
    return <textarea className={inputClasses} {...rest} />;
  } else {
    return <input type={type} className={inputClasses} {...rest} />;
  }
};

export default StyledInput;
