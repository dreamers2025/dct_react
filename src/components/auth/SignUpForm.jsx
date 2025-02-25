import { Form, NavLink } from "react-router-dom";
import styles from "./SignUpForm.module.scss";
import { useState, useRef, useEffect } from "react";
import {debounce} from 'lodash';

const LoginForm = () => {

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isSafePassword, setIsSafePassword] = useState(true);
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(()=>{
    emailRef.current.focus();
  },[]);

  const handleEmail = e =>{
    if(e.target.value.length===0){
      setIsValidEmail(true);
      return;
    }
    setIsValidEmail(e.target.value.includes('@'))
  }
  const isPasswordSafe = pw =>{
    if(pw.length<7){
      setIsSafePassword(false);
      return;
    }
    setIsSafePassword(true);
  }
  const checkPasswordMatch = (password,passwordCheck)=>{
    return password===passwordCheck;
  };
  const handlePassword = () => {
    setPassword(passwordRef.current.value);
    setIsPasswordMatch(checkPasswordMatch(passwordRef.current.value,passwordCheck));
    isPasswordSafe(password);
  };

  const handlePasswordCheck = e => {
    setPasswordCheck(passwordCheckRef.current.value);
    setIsPasswordMatch(checkPasswordMatch(password,passwordCheckRef.current.value));
  };

  const handleSubmit = () => {
    if(isValidEmail&&passwordRef.current.value===passwordCheckRef.current.value&&isSafePassword&&emailRef.current.value.length>0&&password.length>7&&nameRef.current.value.length>0){
      setIsValidForm(true);
    }else{
      setIsValidForm(false);
    }
  }

  return (
    <div >
      <Form
        className={styles.form}
        method="POST"
        noValidate
        onChange={handleSubmit}
      >
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
          <input id="password"
          ref={passwordRef}
          onChange={handlePassword}
          type="password" name="password" required />
        </p>
        {!isSafePassword && <p className={styles.misMatch}>비밀번호는 8자리 이상이어야합니다.</p>}
        <p>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input id="passwordCheck"
          ref={passwordCheckRef}
          onChange={handlePasswordCheck}
          type="password" name="passwordCheck" required />
        </p>
        {!isPasswordMatch && <p className={styles.misMatch}>비밀번호가 일치하지 않습니다</p>}
        <div className={styles.actions}>
          <button type="submit" disabled={!isValidForm} className={!isValidForm? styles.disabled:'' }>가입하기</button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
