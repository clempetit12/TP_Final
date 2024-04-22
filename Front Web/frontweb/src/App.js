import styles from "./App.module.css";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "./Auth/LoginSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(login({ email, password }));
    navigate("/homePage");
  };

  return (
    <main className={styles.main}>
      <section className={styles.sectionOne}></section>
      <section className={styles.sectionTwo}>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.input}
              type="text"
              id="email"
              name="email"
              ref={emailRef}
            />
          </div>
          <div className={styles.password}>
            <label htmlFor="password">Password</label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
            />
          </div>
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;
