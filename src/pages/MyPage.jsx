import {useEffect,useRef}from "react";
import styles from "./MyPage.module.scss";
import { useAuth } from "../components/auth/AuthProvider";
import RenameModal from "../components/RenameModal";

const MyPage = () => {
  const {fetchUser,fetchWithAuth,user} = useAuth();
  const dialogRef = useRef();

  const handleUpgrade = ()=>{
    if(user.usergrade==="premium"){
      alert("이미 프리미엄 회원이십니다!")
      return;
    }
    const upgrade = async () =>{
      const response = await fetchWithAuth("http://172.30.1.40:8999/api/auth/upgrade",{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      await fetchUser();
      alert("업그레이드되었습니다!")

    }
    upgrade();
  }
  const handleModal = () =>{
    dialogRef.current.showModal();
  }
  
  useEffect(()=>{
    console.log(user);
  },[]);
  if (!user) {
    return <p>로딩 중...</p>;
  }
  return (

    <div className={styles.container}>
      <RenameModal ref={dialogRef} />
      <div className={styles.profileCard}>
        <h2 className={styles.title}>내 정보</h2>
        <p className={styles.name}>닉네임 : {user.username} 
          <button className={styles.editname} onClick={handleModal}>수정하기</button>
        </p>
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