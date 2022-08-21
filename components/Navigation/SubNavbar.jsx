import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import styles from "../../styles/Navbar.module.css";
import FormButton from "../FormElements/FormButton";

const SubNavbar = () => {
  const router = useRouter();
  return (
    <div className={styles.subNav}>
      {router.asPath !== "/posts/create" && (
        <FormButton onClick={() => router.push("/posts/create")}>
          <span>New Post</span>
        </FormButton>
      )}

      <FormButton onClick={signOut}>
        <span>Sign Out</span>
      </FormButton>
    </div>
  );
};

export default SubNavbar;
