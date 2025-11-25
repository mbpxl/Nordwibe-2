// КОНСТАНТЫ ДЛЯ РОУТИНГА
export const WELCOME_ROUTE = "/welcome";
export const SIGN_UP_ROUTE = "/sign-up";
export const SIGN_IN_ROUTE = "/sign-in";
export const OAUTH_CALLBACK = "/oauth/callback";

export const SEARCH_ROUTE = "/search";

export const CHAT_ROUTE = "/chat";
export const CHAT_DIALOG = "/chats/:companionId";

export const MAIN_ROUTE = "/";

export const MY_PROFILE_ROUTE = "/profile";
export const USER_PROFILE_ROUTE = "/profile/:ids";

export const PROFILE_EDIT_ROUTE = "/edit";
export const SETTINGS_ROUTE = "/settings";
export const PRIVATE_SETTINGS = "/private";
export const BLACK_LIST = "/blacklist";

export const QUIZ_ROUTE = "/quiz";
export const QUIZ_PASSING_ROUTE = "/quiz/:uuid";
export const QUIZ_TEST_ROUTE = "/quiz/test/:uuid";
export const QUIZ_RESULT_ROUTE = "/quiz/:uuid/result";

export const TEST_ROUTE = "/test";
export const TEST_PASSING_ROUTE = "/test/:uuid";
export const TEST_RESULT_PAGE = "/test/:uuid/result";

export const PRIVACY_ROUTE = "/privacy";

// СТРАНИЦЫ, ГДЕ БУДЕТ СКРЫТ НАВБАР
export const hideNavBarRoutes = [
  "/sign-up",
  "/sign-in",
  "/welcome",
  "/settings",
];
