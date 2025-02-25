import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./DreamLogPage.module.scss";

// 해몽가 이미지
import ChristianImg from '../image/CHRISTIAN.png'
import MonkImg from '../image/MONK.png'
import VitriolistImg from '../image/VITRIOLIST.png'
import RapperImg from '../image/RAPPER.png'

const interpreterImages = {
    MONK: MonkImg,
    CHRISTIAN: ChristianImg,
    VITRIOLIST: VitriolistImg,
    RAPPER: RapperImg
};


const DreamLogPage = () => {

    const [dreamLogs, setDreamLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 선언

    useEffect(() => {
        // 로그인 상태를 확인
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            // 로그인되어 있지 않으면 로그인 페이지로 리디렉션
            navigate('/login');
            return;
        }

        console.log("accessToken :", accessToken);

        // API에서 데이터를 가져오기 위한 fetch 요청
        fetch("http://localhost:8999/api/mydreams", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setDreamLogs(data); // 서버에서 가져온 데이터를 상태에 저장
                setIsLoading(false); // 로딩 완료
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setIsLoading(false); // 오류 발생 시에도 로딩을 종료
            });
    }, [navigate]); // navigate를 의존성 배열에 추가하여, navigate 함수가 바뀔 때마다 다시 실행

    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중일 때 보여줄 컴포넌트
    }

    console.log("dreamLogs", dreamLogs);

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
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DreamLogPage;
