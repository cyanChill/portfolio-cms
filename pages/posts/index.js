import { useRouter } from "next/router";

const PostsPage = () => {
  const router = useRouter();
  router.replace("/"); // Redirect to home page

  return <div></div>;
};

export default PostsPage;
