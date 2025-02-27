import {Form, NavLink, useSearchParams, useNavigate} from "react-router-dom";
import styles from "./LoginForm.module.scss";
import {useState, useEffect} from "react";
import {useAuth} from "./AuthProvider";

const LoginForm = () => {
    const {login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [searchParams] = useSearchParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("username : " + username + " password : " + password);
            await login(username, password);
        } catch (err) {
            alert("로그인 실패");
        }
    };

    return (
        <div>
            <Form
                className={styles.form}
                noValidate
                method="POST"
                onSubmit={handleSubmit}
            >
                <p>
                    <label htmlFor="username">이메일 혹은 닉네임</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                           name="username" placeholder="이메일 혹은 닉네임" required/>
                </p>
                <p>
                    <label htmlFor="password">비밀번호</label>
                    <input id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                           placeholder="비밀번호" type="password" name="password" required/>
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
