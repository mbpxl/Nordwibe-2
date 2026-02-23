import { lazy } from "react";

// delete ouath route

import {
  BLACK_LIST,
  CHAT_DIALOG,
  CHAT_ROUTE,
  MAIN_ROUTE,
  MY_PROFILE_ROUTE,
  PRIVACY_ROUTE,
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
import SignUpPage from "./pages/AuthPage/SignUpPage";
import SignInPage from "./pages/AuthPage/SignInPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ErrorPage from "./shared/Components/ErrorPage/ErrorPage";
import PrivacyPage from "./pages/PrivacyPage/PrivacyPage";
import TestWrapper from "./pages/TestPage/TestWrapper";
import QuizWrapper from "./pages/QuizPage/QuizWrapper";

// где lazy() - ленивая подгрузка. То есть компонента булет загружена в момент перехода, а не в момент запуска приложения

export const routes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
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
    path: PRIVACY_ROUTE,
    Component: PrivacyPage,
  },
  {
    path: SEARCH_ROUTE,
    Component: lazy(() => import("./pages/SearchPage/SearchPage")),
  },
  {
    path: CHAT_ROUTE,
    Component: lazy(() => import("./pages/ChatDialogPage/ChatWrapper")),
  },
  {
    path: QUIZ_ROUTE,
    Component: QuizWrapper,
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
      () => import("./pages/ProfilePage/UserProfilePage/UserProfilePage"),
    ),
  },
  {
    path: PROFILE_EDIT_ROUTE,
    Component: lazy(() => import("./pages/EditProfilePage/EditProfilePage")),
  },
  {
    path: QUIZ_TEST_ROUTE,
    Component: lazy(() => import("./pages/QuizTestPage/QuizTestWrapper")),
  },
  {
    path: QUIZ_RESULT_ROUTE,
    Component: lazy(() => import("./pages/QuizResultPage/QuizResultWrapper")),
  },
  {
    path: TEST_ROUTE,
    Component: TestWrapper,
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
    Component: SettingsPage,
  },
  {
    path: BLACK_LIST,
    Component: lazy(() => import("./pages/BlackListPage/BlackListPage")),
  },
  {
    path: CHAT_DIALOG,
    Component: lazy(() => import("./pages/ChatDialogPage/ChatDialogPage")),
  },
  {
    path: "*",
    Component: ErrorPage,
  },
];
