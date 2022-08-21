/* 
  Description:
    Layout used for the blog pages (excluding the /blog/preview route)
    once this feature is implemented
*/
import { useSession } from "next-auth/react";

import styles from "../../styles/FileSystemLayout.module.css";
import Navbar from "../Navigation/Navbar";
import SubNavbar from "../Navigation/SubNavbar";

const FileSystemLayout = ({ children }) => {
  const { status } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {status === "authenticated" && (
          <>
            <Navbar />
            <SubNavbar />
          </>
        )}
        <div className={styles.contentArea}>{children}</div>
      </div>
    </div>
  );
};

export default FileSystemLayout;
