import React from "react";
import styles from "./MyPage.module.scss";

const MyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        
        <h2 className={styles.name}>홍길동</h2>
        <p className="email">honggildong@example.com</p>

        <div className="btn-group">
          <button className="edit-btn">프로필 수정</button>
          <button className="logout-btn">로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;