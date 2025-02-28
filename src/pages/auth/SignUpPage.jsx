import { React, useEffect }from "react";
import { useNavigate, useActionData } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm.jsx";
import { useAuth } from "../../components/auth/AuthProvider.jsx";

const SignUpPage = () => {
  const { login } = useAuth(); // useAuth에서 login 가져옴
  const actionData = useActionData(); // action 함수의 결과 받아오기

  useEffect(() => {
    if (actionData?.success) {
      const { username, password } = actionData;

      // 회원가입 성공 후 자동 로그인
      login(username, password);
    } else if (actionData?.error) {
      alert(`회원가입 실패: ${actionData.error}`);
    }
  }, [actionData, login]);


  return <SignUpForm />;
};

export default SignUpPage;

export const action = async ({ request, params }) => {
  try {
    const formdata = await request.formData();
    const payload = {
      email: formdata.get("email"),
      username: formdata.get("username"),
      password: formdata.get("password"),
    };
    const response = await fetch("http://172.30.1.40:8999/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if(!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "회원가입 요청 실패");
    }

    return {
      success: true, username: payload.username, password: payload.password
    };
  } catch (error) {
    alert(`회원가입 실패 : ${error.message || '서버준비중'}`);
    return {
      success: false, error: error.message
    };
  }
};
