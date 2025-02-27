import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previousPage, setPreviousPage] = useState('');
  const navigate = useNavigate();

  // 로그인 후 이전 페이지 이동
  const navigateToPreviousPage = () => {
    if (previousPage) {
      navigate(previousPage); // previousPage가 있으면 그 페이지로 이동
    } else {
      navigate('/'); // 없으면 홈페이지로 이동
    }
  };

  useEffect(() => {
    const savedPage = sessionStorage.getItem('previousPage');
    if (savedPage) {
      setPreviousPage(savedPage);
    }
  }, []);

  // 🔹 토큰 저장 및 로그인 함수
  const login = async (username, password) => {
    const response = await fetch("http://localhost:8999/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken); // JWT 저장
    await fetchUser(); // 로그인 후 유저 정보 가져오기

    navigateToPreviousPage(); // 로그인 후 이전 페이지로 이동
  };

  // 🔹 현재 로그인한 사용자 정보 가져오기
  const fetchUser = async () => {
    console.log("인증성공")
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:8999/api/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    } else {
      setUser(null);
    }
    setLoading(false);

    console.log("로그인 과정에서 마지막 부분 previousPage", previousPage);
    return response;
  };

  // 🔹 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    alert('로그아웃 되었습니다!');
    navigate('/');
  };

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      return fetch(url, { ...options });
    }
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
  
      return response;
    } catch (error) {
      console.error("fetchWithAuth 요청 실패:", error);
      throw error;
    }
  };

  // 🔹 마운트 시 로그인 상태 확인
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  // 페이지 리다이렉션 함수 (로그인되지 않았을 경우 로그인 페이지로 이동)
  const redirectToPage = (page) => {
    setPreviousPage(page);
    sessionStorage.setItem('previousPage', page); // sessionStorage에 이전 페이지 저장
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchUser,fetchWithAuth, redirectToPage}}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 AuthContext 사용 훅
export const useAuth = () => useContext(AuthContext);