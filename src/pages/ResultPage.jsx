import React , { useState,useEffect } from 'react'
import './ResultPage.css'
import SelectedCard from '../components/SelectedCard'
import { useAuth } from '../components/auth/AuthProvider'
import { ClipLoader,RingLoader,MoonLoader,SyncLoader,PuffLoader } from "react-spinners";


const ResultPage = ({ nextStep , filteredCard , payload , getResults }) => {    
  
    const {fetchWithAuth} = useAuth();
    const [loading, setLoading] = useState(false);
    const handleClick = async (e) => {
        try {
          setLoading(true);
          // fetch 요청 (await을 사용하여 비동기 처리)
          const response = await fetchWithAuth(
            `http://localhost:8999/api/gemini/dream-interpretation?interpreterType=${payload.interpreterType}&experience=${payload.experience}&dreamContent=${payload.dreamContent}`
          );
          console.log(response)
          // 응답이 정상인지 확인
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          // 응답을 JSON 형식으로 변환
          const responseData = await response.json();
      
          // 응답 데이터 출력
          console.log(responseData);
          console.log(JSON.stringify(responseData))    
          
          // getResults에 responseData 전달 
          getResults(responseData);  // 부모 컴포넌트에서 결과를 처리

          //step === 5로 증가
          nextStep();
        } catch (error) {
          // 오류 처리
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
      useEffect(()=>{
        setLoading(false);
      },[])

      
  if (loading) return <div className='loading'>
    <div className='loading-message'>
    <span className="wave-text">우</span>
    <span className="wave-text">주</span>
    <span className="wave-text">의</span>
    <span className="wave-text">기</span>
    <span className="wave-text">운</span>
    <span className="wave-text">을</span>
    <span className="wave-text">수</span>
    <span className="wave-text">신</span>
    <span className="wave-text">하</span>
    <span className="wave-text">는</span>
    <span className="wave-text">중</span>
    <span className="wave-text">.</span>
    <span className="wave-text">.</span>
    <span className="wave-text">.</span>
    </div>
    <PuffLoader color="#36d7b7" size={100} />
  </div>;
  
  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard} />          
        </div> 
        <button className="result-btn" onClick={handleClick}>결과보기</button>
      </div>      
    </>
  )
}

export default ResultPage;