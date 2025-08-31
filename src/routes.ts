import { lazy } from "react";

import {
  CHAT_ROUTE,
  MAIN_ROUTE,
  MY_PROFILE_ROUTE,
  PROFILE_EDIT_ROUTE,
  QUIZ_PASSING_ROUTE,
  QUIZ_RESULT_ROUTE,
  QUIZ_ROUTE,
  QUIZ_TEST_ROUTE,
  SEARCH_ROUTE,
  SETTINGS_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  TEST_PASSING_ROUTE,
  TEST_RESULT_PAGE,
  TEST_ROUTE,
  USER_PROFILE_ROUTE,
  WELCOME_ROUTE,
} from "./shared/utils/consts";
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
    Component: lazy(
      () => import("./pages/ProfilePage/UserProfilePage/UserProfilePage")
    ),
  },
  {
    path: PROFILE_EDIT_ROUTE,
    Component: lazy(() => import("./pages/EditProfilePage/EditProfilePage")),
  },
  {
    path: QUIZ_TEST_ROUTE,
    Component: lazy(() => import("./pages/QuizTestPage/QuizTestPage")),
  },
  {
    path: QUIZ_RESULT_ROUTE,
    Component: lazy(() => import("./pages/QuizResultPage/QuizResultPage")),
  },
  {
    path: TEST_ROUTE,
    Component: lazy(() => import("./pages/TestPage/TestPage")),
  },
  {
    path: TEST_PASSING_ROUTE,
    Component: lazy(() => import("./pages/TestPassingPage/TestPassingPage")),
  },
  {
    path: TEST_RESULT_PAGE,
    Component: lazy(() => import("./pages/TestResultPage/TestResultPage")),
  },
  {
    path: SETTINGS_ROUTE,
    Component: lazy(() => import("./pages/SettingsPage/SettingsPage")),
  },
  {
    path: "*",
    Component: lazy(() => import("./shared/Components/ErrorPage/ErrorPage")),
  },
];
