// КОНСТАНТЫ ДЛЯ РОУТИНГА
export const WELCOME_ROUTE = "/welcome";
export const SIGN_UP_ROUTE = "/sign-up";
export const SIGN_IN_ROUTE = "/sign-in";
export const SEARCH_ROUTE = "/search";
export const CHAT_ROUTE = "/chat";
export const MAIN_ROUTE = "/";
export const QUIZ_ROUTE = "/quiz";
export const QUIZ_PASSING_ROUTE = "/quiz/:uuid";
export const MY_PROFILE_ROUTE = "/profile";
export const USER_PROFILE_ROUTE = "/profile/:userId";
export const PROFILE_EDIT_ROUTE = "/edit";
export const QUIZ_TEST_ROUTE = "/quiz/test/:uuid";
export const QUIZ_RESULT_ROUTE = "/quiz/:uuid/result";

// СТРАНИЦЫ, ГДЕ БУДЕТ СКРЫТ НАВБАР
export const hideNavBarRoutes = ["/sign-up", "/sign-in", "/welcome",];