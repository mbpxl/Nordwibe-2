let redirectTimeoutId: NodeJS.Timeout | null = null;

export function redirectToLogin() {
  const currentPath =
    window.location.pathname + window.location.search + window.location.hash;

  if (
    !["/welcome", "/sign-in", "/sign-up"].includes(window.location.pathname)
  ) {
    sessionStorage.setItem("redirectAfterLogin", currentPath);
  }

  if (window.location.pathname !== "/welcome") {
    if (
      window.location.pathname == "/sign-in" ||
      window.location.pathname == "/sign-up"
    ) {
      redirectTimeoutId = setTimeout(() => {
        window.location.href = "/welcome";
      }, 60000);
    } else {
      window.location.href = "/welcome";
    }
  }
}

export function clearRedirectTimeout() {
  if (redirectTimeoutId) {
    clearTimeout(redirectTimeoutId);
    redirectTimeoutId = null;
  }
}

export function forceRedirectToWelcome() {
  clearRedirectTimeout();
  window.location.href = "/welcome";
}
