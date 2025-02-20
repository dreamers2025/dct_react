import React from "react";
import { redirect } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm";

const SignUpPage = () => {
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
    const response = await fetch("http://localhost:8999/api/auth/signup", {
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
    alert('회원가입이 완료되었습니다!')
    return redirect('/login');
  } catch (error) {
    alert(`회원가입 실패 : 서버준비중`);
    return { success: false, error: `signup api error` };
  }
};
