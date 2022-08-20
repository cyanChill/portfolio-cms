import { signOut } from "next-auth/react";

import styles from "../../styles/Navbar.module.css";
import FormButton from "../FormElements/FormButton";

const SubNavbar = () => {
  return (
    <div className={styles.subNav}>
      <FormButton onClick={signOut}>
        <span>Sign Out</span>
      </FormButton>
    </div>
  );
};

export default SubNavbar;
