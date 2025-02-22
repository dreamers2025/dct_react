import React from "react";
import styles from "./DreamLogPage.module.scss";

// 해몽가 이미지
import ChristianImg from '../image/freepik__a-photorealistic-portrait-of-a-middle-eastern-man-__83040-removebg-preview.png'
import MonkImg from '../image/freepik__the-style-is-modern-and-it-is-a-detailed-illustrat__83038-removebg-preview.png'

const dreamLogs = [
    {
        id: 1,
        date: "2025-02-20",
        summary: "하늘을 나는 꿈",
        characterImg: MonkImg,
        interpretation:
            "하늘을 나는 꿈은 자유와 해방을 의미합니다. 현재 답답한 상황에서 벗어나고 싶은 마음이 강할 수 있습니다. " +
            "미래에 좋은 기회가 찾아올 가능성이 높습니다."
    },
    {
        id: 2,
        date: "2025-02-21",
        summary: "아담과 이브 등장 꿈",
        characterImg: ChristianImg,
        interpretation:
            "아담과 이브가 등장하는 꿈은 일반적으로 원초적이고 본능적인 감정을 상징합니다. 이 꿈은 새로운 시작이나 관계의 시작을 나타낼 수 있으며, 본능적인 욕망이나 탐구심을 반영할 수 있습니다. 또한, 자신의 내면의 갈등이나 윤리적인 선택에 대한 고민을 나타내기도 합니다." +
            "아담과 이브는 종종 순수함과 타락의 상징으로 여겨지므로, 당신의 꿈은 현재의 상황에서 진정한 본질을 찾고자 하는 마음을 표현하고 있을 수 있습니다. 이 꿈이 특히 어떤 감정을 불러일으켰는지, 그리고 꿈에서의 상황이 어땠는지에 따라 더 깊은 해석이 가능할 것입니다."
    }
];

const DreamLogPage = () => {
    return (
        <div className={styles.container}>
            {dreamLogs.map((log) => (
                <div key={log.id} className={styles.logCard}>
                    {/* 상단: 작성일 & 한 줄 요약 */}
                    <div className={styles.header}>
                        <span className={styles.date}>{log.date}</span>
                        <span className={styles.summary}>{log.summary}</span>
                    </div>

                    {/* 본문: 좌측 캐릭터 이미지 + 우측 말풍선 해몽 */}
                    <div className={styles.content}>
                        <img src={log.characterImg} alt="해몽가" className={styles.characterImg} />
                        <div className={styles.bubbleContainer}>
                            <div className={styles.bubble}>
                                {log.interpretation}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DreamLogPage;
