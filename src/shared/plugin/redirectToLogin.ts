export function redirectToLogin() {
  const currentPath =
    window.location.pathname + window.location.search + window.location.hash;

  if (
    !["/welcome", "/sign-in", "/sign-up"].includes(window.location.pathname)
  ) {
    sessionStorage.setItem("redirectAfterLogin", currentPath);
  }

  if (window.location.pathname !== "/welcome") {
    window.location.href = "/welcome";
  }
}
