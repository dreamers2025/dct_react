import { createBrowserRouter } from "react-router-dom";
import ChoiceCharacterPage from "../components/ChoiceCharacter";
import UserExperiencePage from "../components/UserExperience";
import DreamContentsPage from "../components/DreamContents";
import StartPage from "../pages/StartPage";
import RootLayout from "../layouts/RootLayout";
import ChoiceCharacter from "../components/ChoiceCharacter";
import UserExperience from "../components/UserExperience";
import DreamContents from "../components/DreamContents";

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
        element: <ChoiceCharacter />,
      },
      {
        path: '/experience',
        element: <UserExperience/>,
      },
      {
        path: '/dreamContents',
        element: <DreamContents />,
      },
    ]
  },  
]);
