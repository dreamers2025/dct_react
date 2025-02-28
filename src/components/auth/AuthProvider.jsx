import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 이전 페이지로 이동
  const navigateToPreviousPage = () => {
    const savedPage = sessionStorage.getItem('previousPage');
    if (savedPage) {
      navigate(savedPage); // previousPage가 있으면 그 페이지로 이동

      // 이동 후 sessionStorage에서 삭제 (약간 지연 후 삭제)
      setTimeout(() => {
        sessionStorage.removeItem('previousPage');
      }, 500);
    } else {
      navigate('/'); // 없으면 홈페이지로 이동
    }
  };

  // 🔹 토큰 저장 및 로그인 함수
  const login = async (username, password) => {
    const response = await fetch("http://172.30.1.40:8999/api/auth/login", {
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

    const response = await fetch("http://172.30.1.40:8999/api/auth/me", {
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

    return response;
  };

  // 🔹 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    sessionStorage.removeItem("previousPage");
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
      console.log(JSON.stringify(response))
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

  /**
   * 로그인 페이지로 리다이렉트하면서 이전 페이지 정보를 저장합니다.
   * @param {string} page - 사용자가 이전에 있던 페이지의 URL.
   */
  const redirectToLogin = (page) => {
    sessionStorage.setItem('previousPage', page); // sessionStorage에 이전 페이지 저장
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchUser,fetchWithAuth, redirectToLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 AuthContext 사용 훅
export const useAuth = () => useContext(AuthContext);