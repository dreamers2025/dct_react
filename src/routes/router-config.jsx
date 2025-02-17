import { createBrowserRouter } from "react-router-dom";
import StartPage from "../pages/StartPage";
import RootLayout from "../layouts/RootLayout";


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
    ]
  },  
]);
