import { Form, NavLink } from "react-router-dom";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  return (
    <div >
      <Form
        className={styles.form}
        noValidate
        // onSubmit={handleSubmit}
      >
        <p>
          <label htmlFor="username">이메일 혹은 닉네임</label>
          <input id="username" type="text" name="username" required />
        </p>
        <p>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="url" name="password" required />
        </p>
        <div className={styles.actions}>
          <button>로그인</button>
        </div>
      </Form>
      <div className={styles.box}>
        <p>계정이 없으신가요? <NavLink className={styles.link} to='/signup'>가입하기</NavLink></p>
      </div>
    </div>
  );
};

export default LoginForm;
