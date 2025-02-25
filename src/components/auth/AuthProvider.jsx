import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 토큰 저장 및 로그인 함수
  const login = async (username, password) => {
    console.log("로그인 진입")
    console.log(JSON.stringify({ username, password }))
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
    return response;
  };

  // 🔹 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    alert('로그아웃 되었습니다!')
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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchUser,fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 AuthContext 사용 훅
export const useAuth = () => useContext(AuthContext);