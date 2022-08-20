import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/react";

import styles from "../styles/Home.module.css";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading" || !status) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/accounts/login");
    return;
  }

  return (
    <div>
      <p>Signed in as {session.user.username}</p>
    </div>
  );
};

export default Home;
