import React from "react";
import styles from "./ErrorPage.module.scss";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ errorCode = 404, message = "페이지를 찾을 수 없습니다" }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.glowText}>{errorCode}</h1>
            <p className={styles.message}>{message}</p>
            <button className={styles.homeButton} onClick={() => navigate("/")}>
                홈으로 가기
            </button>
        </div>
    );
};

export default ErrorPage;