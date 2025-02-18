import { Outlet } from 'react-router-dom';
import './RootLayout.css';

const RootLayout = () => {
  return (
    <div className="main-page">
      
        {/* 바뀌는부분(동적 컴포넌트)이 들어갈 자리 */}
        <Outlet />      
      
      <div className="stars"></div>
      <button className='login-btn'>로그인</button>
    </div>
  )
}

export default RootLayout;