import { createBrowserRouter } from "react-router-dom";
import ChoiceCharacterPage from "../pages/ChoiceCharacterPage";
import UserExperiencePage from "../pages/UserExperiencePage";
import DreamContentsPage from "../pages/DreamContentsPage";
import StartPage from "../pages/StartPage";
import RootLayout from "../layouts/RootLayout";

//라우터 설정
export const router = createBrowserRouter([

  //CharacterPage, UserExperiencePage, DreamContentsPage 중첩라우팅
  //StartPage 제외 (비교를 위해 빼뒀음 중첩안으로 넣어도 상관없음)
  //중첩 시킬 시 StartPage.jsx에서 중복되는 태그 제거필요요

  {
    path:'/',
    element:<RootLayout />,
    children: [
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
  {
    path: '/startPage',
    element: <StartPage />,
  },  
]);
