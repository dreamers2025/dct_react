import { createBrowserRouter } from "react-router-dom";
import StartPage from "../pages/StartPage";
import RootLayout from "../layouts/RootLayout";
import DreamLogPage from "../pages/DreamLogPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";


//라우터 설정
export const router = createBrowserRouter([

  //중첩라우팅

  {
    path:'/',
    element:<RootLayout />,
    errorElement:<ErrorPage />,
    children: [
      {
        path: '/',
        element: <StartPage />,
      },
      {
        path: '/dreamlog/mydreams',
        element: <DreamLogPage />,
      }
    ]
  },  
]);
