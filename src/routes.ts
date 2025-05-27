import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
// import SignUp from "./pages/SignUpPage";
import Welcome from "./pages/WelcomePage";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE, WELCOME_ROUTE } from "./utils/consts";

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
]