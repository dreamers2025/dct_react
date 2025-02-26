import { Form, NavLink,useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { ClipLoader,RingLoader,MoonLoader,SyncLoader,PuffLoader } from "react-spinners";

const LoginForm = () => {
  const {login} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("username : "+username+" password : "+password);
      await login(username, password);
      navigate('/');
    } catch (err) {
      alert("로그인 실패");
    }finally{
      setLoading(false);
    }
  };

  if (loading) return <div className='loading'>
      <div className={styles.loading_message}>
      <p>로그인 중 ...</p>
      </div>
      <ClipLoader color="#36d7b7" size={80} />
    </div>;

  return (
    <div >
      <Form
        className={styles.form}
        noValidate
        method="POST"
        onSubmit={handleSubmit}
      >
        <p>
          <label htmlFor="username">이메일 혹은 닉네임</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username"placeholder="이메일 혹은 닉네임" required />
        </p>
        <p>
          <label htmlFor="password">비밀번호</label>
          <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" type="password" name="password" required />
        </p>
        <div className={styles.actions}>
          <button type="submit">로그인</button>
        </div>
      </Form>
      <div className={styles.box}>
        <p>계정이 없으신가요? <NavLink className={styles.link} to='/signup'>가입하기</NavLink></p>
      </div>
    </div>
  );
};

export default LoginForm;
