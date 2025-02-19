import { createBrowserRouter } from "react-router-dom";
import StartPage from "../pages/StartPage";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";



//라우터 설정
export const router = createBrowserRouter([

  //중첩라우팅

  {
    path:'/',
    element:<RootLayout />,
    children: [
      {
        path: '/',
        element: <StartPage />,
      },  
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignUpPage />
      }
    ]
  },  
]);
