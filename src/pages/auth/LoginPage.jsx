import React from 'react'
import { redirect } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <LoginForm />
  )
}

export default LoginPage

// export const action = async ({ request, params }) => {
//   try {
//     const formdata = await request.formData();
//     const payload = {
//       username: formdata.get("username"),
//       password: formdata.get("password"),
//     };
//     const response = await fetch("http://localhost:8999/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
//     if(!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(errorMessage || "로그인 요청 실패");
//     }
//     localStorage.setItem('accessToken', request.accessToken);
//     alert('로그인 되었습니다!')
//     return redirect('/');
//   } catch (error) {
//     alert(`로그인 실패 : 서버준비중`);
//     return { success: false, error: `signup api error` };
//   }
// };
