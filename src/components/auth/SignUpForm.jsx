import { Form } from "react-router-dom";
import styles from "./SignUpForm.module.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const SignUpForm = () => {
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isSafePassword, setIsSafePassword] = useState(true);
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const debouncedHandleEmail = useCallback(
    debounce((value) => {
      setIsValidEmail(value.includes("@"));
    }, 700),
    []
  );

  const handleEmail = (e) => {
    if (e.target.value.length === 0) {
      setIsValidEmail(true);
      return;
    }
    debouncedHandleEmail(e.target.value);
  };

  const isPasswordSafe = useCallback(
    debounce((pw) => {
      setIsSafePassword(pw.length >= 8);
    }, 700),
    []
  );

  const checkPasswordMatch = (password, passwordCheck) => {
    return password === passwordCheck;
  };

  const debouncedHandlePassword = useCallback(
    debounce(() => {
      setPassword(passwordRef.current.value);
      setIsPasswordMatch(checkPasswordMatch(passwordRef.current.value, passwordCheck));
      isPasswordSafe(passwordRef.current.value);
    }, 700),
    [passwordCheck]
  );

  const debouncedHandlePasswordCheck = useCallback(
    debounce(() => {
      setPasswordCheck(passwordCheckRef.current.value);
      setIsPasswordMatch(checkPasswordMatch(password, passwordCheckRef.current.value));
    }, 700),
    [password]
  );

  const handleSubmit = () => {
    if (
      isValidEmail &&
      passwordRef.current.value === passwordCheckRef.current.value &&
      isSafePassword &&
      emailRef.current.value.length > 0 &&
      password.length >= 8 &&
      nameRef.current.value.length > 0
    ) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  };

  return (
    <div>
      <Form className={styles.form} method="POST" noValidate onChange={handleSubmit}>
        <p>
          <label htmlFor="email">이메일</label>
          <input id="email" ref={emailRef} onChange={handleEmail} type="email" name="email" required />
        </p>
        {!isValidEmail && <p className={styles.misMatch}>올바른 이메일 형식이 아닙니다</p>}
        <p>
          <label htmlFor="username">닉네임</label>
          <input id="username" type="text" name="username" ref={nameRef} required />
        </p>
        <p>
          <label htmlFor="password">비밀번호</label>
          <input id="password" ref={passwordRef} onChange={debouncedHandlePassword} type="password" name="password" required />
        </p>
        {!isSafePassword && <p className={styles.misMatch}>비밀번호는 8자리 이상이어야 합니다.</p>}
        <p>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input id="passwordCheck" ref={passwordCheckRef} onChange={debouncedHandlePasswordCheck} type="password" name="passwordCheck" required />
        </p>
        {!isPasswordMatch && <p className={styles.misMatch}>비밀번호가 일치하지 않습니다</p>}
        <div className={styles.actions}>
          <button type="submit" disabled={!isValidForm} className={!isValidForm ? styles.disabled : ""}>
            가입하기
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
