import { useRouter } from "next/router";

import styles from "../styles/Error.module.css";

const Error500Page = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <h1 className="glitch-stack" style={{ "--stacks": 3, "--dur": "2.75s" }}>
        <span style={{ "--index": 1 }}>Lost in the Matrix</span>
        <span style={{ "--index": 2 }}>Lost in the Matrix</span>
        <span style={{ "--index": 3 }}>Lost in the Matrix</span>
      </h1>
      <p className={styles.errMsg}>
        <strong>500:</strong> A server-side error has occurred.{" "}
        <span onClick={() => router.push("/")}>Click here to go home.</span>
      </p>
    </div>
  );
};

export default Error500Page;
