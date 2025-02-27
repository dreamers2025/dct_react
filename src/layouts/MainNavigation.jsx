import { NavLink,useNavigate } from 'react-router-dom';
import styles from './MainNavigation.module.scss';
import { useAuth } from '../components/auth/AuthProvider';

const MainNavigation = () => {
    const navigation = useNavigate();
    const {user, logout} = useAuth();
    // NavLink에 className에 바인딩하는 콜백함수
    // 현재 위치한 메뉴 정보를 알려줌
    const activeFn = ({ isActive }) => {
        // 클래스 이름을 반환
        return isActive ? styles.active : '';
    };
    const toHome = ()=>{
        navigate('/');
    }

    return (
        <nav className={`${styles.header} main-nav`}>
            {/* 좌측 1 비율 공간, 오른쪽 정렬 */}
            <div className={styles.left}>
                <ul className={styles.list}>
                    <li>
                        <NavLink className={activeFn} onClick={toHome} end>
                            홈
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={activeFn} to='/dreamlog/mydreams'>
                            꿈 기록
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* 중앙 영역 3 비율 공간, 비어있음 */}
            <div className={styles.center}></div>

            {/* 우측 1 비율 로그인 버튼, 왼쪽 정렬 */}
            <div className={styles.right}>
                {user?<NavLink className={activeFn} to='/mypage'>내 정보</NavLink>:''}
                {!user?
                    <NavLink to='/login' className={styles["login-btn"]}>로그인</NavLink>
                :<button className={styles["logout-btn"]} onClick={logout}>
                로그아웃
            </button>}
            </div>
        </nav>
    );
};

export default MainNavigation;