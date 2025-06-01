import ChatPage from "./pages/ChatPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import QuizPage from "./pages/QuizPage";
import SearchPage from "./pages/SearchPage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Welcome from "./pages/WelcomePage";
import { CHAT_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, QUIZ_ROUTE, SEARCH_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE, WELCOME_ROUTE } from "./utils/consts";

export const routes = [
  {
    path: WELCOME_ROUTE,
    Component: Welcome,
  },
  {
    path: SIGN_UP_ROUTE,
    Component: SignUp,
  },
  {
    path: SIGN_IN_ROUTE,
    Component: SignIn,
  },
  {
    path: SEARCH_ROUTE,
    Component: SearchPage,
  },
  {
    path: CHAT_ROUTE,
    Component: ChatPage,
  },
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: QUIZ_ROUTE,
    Component: QuizPage,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
];