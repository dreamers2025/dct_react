import {useEffect}from "react";
import styles from "./MyPage.module.scss";
import { useAuth } from "../components/auth/AuthProvider";

const MyPage = () => {
  const {fetchUser,fetchWithAuth,user} = useAuth();

  const handleUpgrade = ()=>{
    const upgrade = async () =>{
      const response = await fetchWithAuth("http://localhost:8999/api/auth/upgrade",{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    upgrade();
  }
  useEffect(()=>{
    console.log(user);
  },[]);
  if (!user) {
    return <p>로딩 중...</p>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <h2 className={styles.title}>내 정보</h2>
        <p className={styles.name}>닉네임 : {user.username}</p>
        <p className="email">이메일 : {user.email}</p>
        <p className="grade">등급 : {user.usergrade.toUpperCase()}</p>
        <p className="date">가입일 : {user.created_at.split("T")[0]}</p>

        <div className={styles.btn_box}>
          <button className={styles.premium} onClick={handleUpgrade}>프리미엄 회원으로 업그레이드</button>
        </div>
        
      </div>
    </div>
  );
};

export default MyPage;