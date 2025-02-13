import { createBrowserRouter } from "react-router-dom";
import ChoiceCharacterPage from "../pages/ChoiceCharacterPage";
import UserExperiencePage from "../pages/UserExperiencePage";
import DreamContentsPage from "../pages/DreamContentsPage";
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
      {
        path: '/character',
        element: <ChoiceCharacterPage />,
      },
      {
        path: '/experience',
        element: <UserExperiencePage />,
      },
      {
        path: '/dreamContents',
        element: <DreamContentsPage />,
      },
    ]
  },  
]);
