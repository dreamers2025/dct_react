import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./DreamLogPage.module.scss";
import { useAuth } from "../components/auth/AuthProvider";

// 해몽가 이미지
import ChristianImg from '../image/christian.png'
import MonkImg from '../image/monk.png'
import VitriolistImg from '../image/vitriolist.png'
import RapperImg from '../image/rapper.png'
import MansourImg from '../image/mansour.png'
import PossesedBabyImg from '../image/possessed_baby.png'

const interpreterImages = {
    MONK: MonkImg,
    CHRISTIAN: ChristianImg,
    VITRIOLIST: VitriolistImg,
    RAPPER: RapperImg,
    POSSESSEDBABY: PossesedBabyImg,
    MANSOUR: MansourImg,
};

const DreamLogPage = () => {

    const { user, fetchWithAuth, redirectToLogin } = useAuth(); // 로그인 유저 정보
    const [dreamLogs, setDreamLogs] = useState([]);

    useEffect(() => {
        // 로그인하지 않았다면 현재 페이지를 previouPage에 저장하고 로그인 페이지로 이동
        if (!user) {
            redirectToLogin('/dreamlog/mydreams');
        }

        // API에서 데이터를 가져오기 위한 fetch 요청
        fetchWithAuth("http://localhost:8999/api/mydreams", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setDreamLogs(data); // 서버에서 가져온 데이터를 상태에 저장
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);
    const handleDelete = async (id) => {
        const response = await fetchWithAuth(`http://localhost:8999/api/mydreams/delete/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              }
        });
        if(response.ok){
            alert('삭제되었습니다!');
            setDreamLogs(dreamLogs.filter(dream=>dream.dreamId!==id));
        } 
        else{alert('삭제실패!')}
    }

    if (dreamLogs.length === 0) {
        return (
            <div className={styles.noDreamLogsContainer}>
                <div className={styles.noDreamLogsMessage}>
                    아직 꿈 기록이 없어요. <br/> 첫 꿈을 남겨보세요!
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {dreamLogs.map((dream) => (
                <div key={dream.dreamId} className={styles.logCard}>
                    {/* 상단: 작성일 & 한 줄 요약 */}
                    <div className={styles.header}>
                        <span className={styles.date}>{dream.date}</span>
                        <span className={styles.summary}>{dream.summary}</span>
                    </div>

                    {/* 본문: 좌측 캐릭터 이미지 + 우측 말풍선 해몽 */}
                    <div className={styles.content}>
                        <img src={interpreterImages[dream.interpreter]} alt="해몽가" className={styles.characterImg}/>
                        <div className={styles.bubbleContainer}>
                            <div className={styles.bubble}>
                                {dream.content}
                            </div>
                            <button className={styles.delete} onClick={()=>handleDelete(dream.dreamId)}>삭제하기</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DreamLogPage;
