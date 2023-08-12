import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import useAuth from "../hooks/useAuth";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/app/cities", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className="login-btn">Login</button>
        </div>
      </form>
    </main>
  );
}
