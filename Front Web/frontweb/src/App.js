import styles from "./App.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "./Auth/LoginSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await dispatch(login({ email, password }));
    navigate("/dashboard")
    emailRef.current.value = "";
    passwordRef.current.value = "";
    
  };

  return (
    <main className={styles.main}>
    <section className={styles.sectionOne}>
  <div className="d-flex justify-content-center p-5" style={{ height: "100%" }}>
    <img
      src={require("./assets/logo.png")}
      alt="Circle"
      className="img-fluid rounded-circle mr-3"
      style={{ width: "100px", height: "100px" }}
    />
  </div>
</section>

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
