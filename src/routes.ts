import { lazy } from "react";

import { CHAT_ROUTE, MAIN_ROUTE, MY_PROFILE_ROUTE, QUIZ_PASSING_ROUTE, QUIZ_ROUTE, SEARCH_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE, USER_PROFILE_ROUTE, WELCOME_ROUTE } from "./shared/utils/consts";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/MyProfilePage/MyProfilePage";

// где lazy() - ленивая подгрузка. То есть компонента булет загружена в момент перехода, а не в момент запуска приложения

export const routes = [
  {
    path: WELCOME_ROUTE,
    Component: WelcomePage,
  },
  {
    path: SIGN_UP_ROUTE,
    Component: lazy(() => import("./pages/AuthPage/SignUpPage")),
  },
  {
    path: SIGN_IN_ROUTE,
    Component: lazy(() => import("./pages/AuthPage/SignInPage")),
  },
  {
    path: SEARCH_ROUTE,
    Component: lazy(() => import("./pages/SearchPage/SearchPage")),
  },
  {
    path: CHAT_ROUTE,
    Component: lazy(() => import("./pages/ChatPage/ChatPage")),
  },
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: QUIZ_ROUTE,
    Component: lazy(() => import("./pages/QuizPage/QuizPage")),
  },
  {
    path: QUIZ_PASSING_ROUTE,
    Component: lazy(() => import("./pages/QuizPassingPage/QuizPassingPage")),
  },
  {
    path: MY_PROFILE_ROUTE,
    Component: ProfilePage,
  },
  {
    path: USER_PROFILE_ROUTE,
    Component: lazy(() => import("./pages/ProfilePage/UserProfilePage/UserProfilePage")),
  },
];