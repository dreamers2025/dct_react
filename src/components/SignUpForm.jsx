import { Form, NavLink } from "react-router-dom";
import styles from "./SignUpForm.module.scss";

const LoginForm = () => {
  return (
    <div >
      <Form
        className={styles.form}
        noValidate
        // onSubmit={handleSubmit}
      >
        <p>
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" name="email" required />
        </p>
        <p>
          <label htmlFor="username">닉네임</label>
          <input id="username" type="text" name="username" required />
        </p>
        <p>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="text" name="password" required />
        </p>
        <p>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input id="passwordCheck" type="text" name="passwordCheck" required />
        </p>
        <div className={styles.actions}>
          <button>가입하기</button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
