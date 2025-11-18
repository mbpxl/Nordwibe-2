import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

export const useOAuth2 = () => {
  const startOAuth2 = useMutation({
    mutationFn: async (provider: "vk" | "yandex"): Promise<string> => {
      const response = await api.post(
        `/auth/oauth2/start?provider=${provider}`,
        {},
        {
          headers: {
            Accept: "text/plain",
          },
          transformResponse: [(data) => data],
        }
      );

      let redirectUrl = response.data;

      console.log("Raw URL from server:", redirectUrl);

      if (typeof redirectUrl === "string") {
        redirectUrl = redirectUrl.replace(/^"+|"+$/g, "");

        redirectUrl = redirectUrl.trim();
      }

      console.log("Cleaned URL:", redirectUrl);
      console.log(
        "Starts with https:// after cleaning:",
        redirectUrl.startsWith("https://")
      );

      if (!redirectUrl) {
        throw new Error("Empty redirect URL received from server");
      }

      if (typeof redirectUrl !== "string") {
        throw new Error(`Invalid redirect URL type: ${typeof redirectUrl}`);
      }

      const isUrlValid =
        redirectUrl &&
        redirectUrl.length > 10 &&
        (redirectUrl.startsWith("http://") ||
          redirectUrl.startsWith("https://"));

      if (!isUrlValid) {
        throw new Error(`Invalid redirect URL format: ${redirectUrl}`);
      }

      return redirectUrl;
    },
  });

  return {
    startOAuth2: startOAuth2.mutate,
    isStarting: startOAuth2.isPending,
    error: startOAuth2.error,
  };
};
