import { lazy } from "react";

import { CHAT_ROUTE, MAIN_ROUTE, MY_PROFILE_ROUTE, QUIZ_ROUTE, SEARCH_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE, USER_PROFILE_ROUTE, WELCOME_ROUTE } from "./utils/consts";
import WelcomePage from "./pages/WelcomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/MyProfilePage";

export const routes = [
  {
    path: WELCOME_ROUTE,
    Component: WelcomePage,
  },
  {
    path: SIGN_UP_ROUTE,
    Component: SignUpPage,
  },
  {
    path: SIGN_IN_ROUTE,
    Component: SignInPage,
  },
  {
    path: SEARCH_ROUTE,
    Component: lazy(() => import("./pages/SearchPage")),
  },
  {
    path: CHAT_ROUTE,
    Component: lazy(() => import("./pages/ChatPage")),
  },
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: QUIZ_ROUTE,
    Component: lazy(() => import("./pages/QuizPage")),
  },
  {
    path: MY_PROFILE_ROUTE,
    Component: ProfilePage,
  },
  {
    path: USER_PROFILE_ROUTE,
    Component: lazy(() => import("./pages/UserProfilePage")),
  },
];