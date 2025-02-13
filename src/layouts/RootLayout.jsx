import { Outlet } from 'react-router-dom';
import './RootLayout.css';

const RootLayout = () => {
  return (
    <div className="main-page">
      <div className="overlay">
        {/* 바뀌는부분(동적 컴포넌트)이 들어갈 자리 */}
        <Outlet />
      </div>
      <div className="moon"></div>
      <div className="stars"></div>
    </div>
  )
}

export default RootLayout;