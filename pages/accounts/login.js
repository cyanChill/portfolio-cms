import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { signIn, useSession } from "next-auth/react";

import styles from "../../styles/Login.module.css";
import { customToast } from "../../utils/customToast";
import FancyInput from "../../components/FormElements/FancyInput";
import FormButton from "../../components/FormElements/FormButton";

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username: e.target.username.value,
      password: e.target.password.value,
      redirect: false,
    });

    if (result.error) customToast("error", "Invalid credentials.");

    // useEffect will make us autoredirect to home page since "status" will
    // have a value of "authenticated" if we've successfully logged in
  };

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]); // eslint-disable-line

  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FancyInput type="text" name="username" labelText="Username" required />
        <FancyInput
          type="password"
          name="password"
          labelText="Password"
          required
        />
        <FormButton type="submit">
          <span>Submit</span>
        </FormButton>
      </form>
    </div>
  );
};

export default LoginPage;
