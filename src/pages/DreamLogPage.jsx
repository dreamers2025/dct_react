import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./DreamLogPage.module.scss";

// 해몽가 이미지
import ChristianImg from '../image/freepik__a-photorealistic-portrait-of-a-middle-eastern-man-__83040-removebg-preview.png'
import MonkImg from '../image/freepik__the-style-is-modern-and-it-is-a-detailed-illustrat__83038-removebg-preview.png'

// const dreamLogs = [
//     {
//         id: 1,
//         date: "2025-02-20",
//         summary: "하늘을 나는 꿈",
//         characterImg: MonkImg,
//         interpretation:
//             "하늘을 나는 꿈은 자유와 해방을 의미합니다. 현재 답답한 상황에서 벗어나고 싶은 마음이 강할 수 있습니다. " +
//             "미래에 좋은 기회가 찾아올 가능성이 높습니다."
//     },
//     {
//         id: 2,
//         date: "2025-02-21",
//         summary: "아담과 이브 등장 꿈",
//         characterImg: ChristianImg,
//         interpretation:
//             "아담과 이브가 등장하는 꿈은 일반적으로 원초적이고 본능적인 감정을 상징합니다. 이 꿈은 새로운 시작이나 관계의 시작을 나타낼 수 있으며, 본능적인 욕망이나 탐구심을 반영할 수 있습니다. 또한, 자신의 내면의 갈등이나 윤리적인 선택에 대한 고민을 나타내기도 합니다." +
//             "아담과 이브는 종종 순수함과 타락의 상징으로 여겨지므로, 당신의 꿈은 현재의 상황에서 진정한 본질을 찾고자 하는 마음을 표현하고 있을 수 있습니다. 이 꿈이 특히 어떤 감정을 불러일으켰는지, 그리고 꿈에서의 상황이 어땠는지에 따라 더 깊은 해석이 가능할 것입니다."
//     }
// ];

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

        // API에서 데이터를 가져오기 위한 fetch 요청
        fetch("http://localhost:8999/dreamlog/mydreams", {
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

    if (dreamLogs.length === 0) {
        return <div>No dream logs found.</div>; // 꿈 로그가 없을 경우 보여줄 컴포넌트
    }

    return (
        <div className={styles.container}>
            {dreamLogs.map((dream) => (
                <div key={dream.id} className={styles.logCard}>
                    {/* 상단: 작성일 & 한 줄 요약 */}
                    <div className={styles.header}>
                        <span className={styles.date}>{dream.date}</span>
                        <span className={styles.summary}>{dream.summary}</span>
                    </div>

                    {/* 본문: 좌측 캐릭터 이미지 + 우측 말풍선 해몽 */}
                    <div className={styles.content}>
                        <img src={dream.characterImg} alt="해몽가" className={styles.characterImg} />
                        <div className={styles.bubbleContainer}>
                            <div className={styles.bubble}>
                                {dream.interpretation}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DreamLogPage;
