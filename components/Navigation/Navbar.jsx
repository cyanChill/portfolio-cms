import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsHouse, BsHouseFill } from "react-icons/bs";

import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const router = useRouter();

  const [crumbs, setCrumbs] = useState([]);

  useEffect(() => {
    if (router.asPath) {
      const pathSegments = router.asPath.split("/");
      if (pathSegments.length === 2 && !pathSegments[1]) setCrumbs([""]);
      else setCrumbs(pathSegments);
    }
  }, [router]);

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.homeContainer}>
        <BsHouse className={styles.homeBtn} onClick={() => router.push("/")} />
        <BsHouseFill
          className={styles.homeBtnFill}
          onClick={() => router.push("/")}
        />
      </div>

      <div className={styles.breadCrumbs}>
        {crumbs.map((pathSeg, idx) => {
          return idx === crumbs.length - 1 ? (
            <span key={idx} className={styles.currPath}>
              {pathSeg === "" ? "Home" : pathSeg}
            </span>
          ) : (
            <span key={idx}>
              <Link href={idx === 0 ? "/" : crumbs.slice(0, idx + 1).join("/")}>
                {pathSeg === "" ? "Home" : pathSeg}
              </Link>{" "}
              /{" "}
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
