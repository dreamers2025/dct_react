import React, { useState } from 'react';
import styles from './Gemini.module.scss';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Gemini = () => {
  const [character, setCharacter] = useState('');
  const [background, setBackground] = useState('');
  const [dream, setDream] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null); // 오류 상태 추가

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
     model: "gemini-2.0-flash",
     generationConfig: {
      // stopSequences: ['\n'], // 줄바꿈에서 생성을 중지
      maxOutputTokens: 500,  // 최대 토큰 제한한
      // temperature: 0.7,      // 무작위성 조절
      // topP: 0.9,             // 누적 확률 기반 샘플링
      // topK: 50, 
     }
    },);


  const handleSubmit = async (e) => {
    e.preventDefault();
    //=====********* 프롬프트 조립하는 구간***** ===================
    const prompt = `당신은 해몽가입니다. 당신의 성격은 ${character}이고 사용자는 ${background}라는 고민을 가지고 있으며 ${dream}라는 꿈을 꾸었습니다. 대화하듯이 500자 이내로 해몽해주고 점수를 10점만점에서 매겨주세요.`;
    try {
      console.log(prompt)
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      console.log(text);
      setResponse(text);
      //인풋창 비우기 일단은 꺼둠
      // setCharacter('');
      // setBackground('');
      // setDream('');
    } catch (err) {
      setError('응답을 생성하는 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <h1>Gemini 해몽 테스트</h1>
          {error && <div className={styles.error}>{error}</div>} {/* 오류 메시지 표시 */}
          <div className={styles.content}>{response}</div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrap}>
              <span>해몽가 성격</span>
              <input
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
              />
            </div>
            <div className={styles.inputWrap}>
              <span>사용자의 고민</span>
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
              />
            </div>
            <div className={styles.inputWrap}>
              <span>사용자의 꿈</span>
              <input
                type="text"
                value={dream}
                onChange={(e) => setDream(e.target.value)}
              />
            </div>
            <button type="submit">Generate</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Gemini;