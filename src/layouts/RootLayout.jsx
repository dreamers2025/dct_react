import { Outlet } from 'react-router-dom';
import './RootLayout.css';
import MainNavigation from "./MainNavigation.jsx";
import { AuthProvider } from '../components/auth/AuthProvider.jsx';

const RootLayout = () => {
  return (
    <div className="main-page">
      <AuthProvider>
        <MainNavigation />
        {/* 바뀌는부분(동적 컴포넌트)이 들어갈 자리 */}
        <Outlet />
      
        <div className="stars"></div>
      </AuthProvider>
    </div>
    
  )
}

export default RootLayout;