import { useMemo } from "react";
import { useGetMe } from "../../ProfilePage/service/useGetMe";

interface UserProfile {
  username: string;
  name: string;
  usage_goal: string;
  desired_length: string;
  chronotype: string;
  max_budget: number;
  occupation: string;
  smoking_status: string;
  gender: string;
  pets: string;
  religion: string;
  about: string;
  ready_for_smalltalk: boolean;
  id: string;
  status: string;
  birth_date: any;
  city_name: string;
  hometown_name: string;
  hashtags_list: string[];
  url: string;
  onboarding_completed: string;
  full_registration_completed: string;
  avatar_url: string;
}

const REQUIRED_FIELDS: (keyof UserProfile)[] = [
  "username",
  "desired_length",
  "max_budget",
  "occupation",
  "smoking_status",
  "pets",
  "about",
  "birth_date",
  "hometown_name",
  "hashtags_list",
  "avatar_url",
];

export const useProfileCompletion = () => {
  const { data: user, isLoading, isError } = useGetMe();

  const completionPercentage = useMemo(() => {
    if (!user || isLoading || isError) {
      return 0;
    }

    let filledFields = 0;

    REQUIRED_FIELDS.forEach((field) => {
      const value = user[field];

      switch (field) {
        case "username":
        case "desired_length":
        case "occupation":
        case "smoking_status":
        case "pets":
        case "about":
        case "hometown_name":
        case "avatar_url":
          if (typeof value === "string" && value.trim().length > 0) {
            filledFields++;
          }
          break;

        case "max_budget":
          if (typeof value === "number" && value > 0) {
            filledFields++;
          }
          break;

        case "birth_date":
          if (typeof value === "string" && value.length > 0) {
            filledFields++;
          }
          break;

        case "hashtags_list":
          if (Array.isArray(value) && value.length > 0) {
            filledFields++;
          }
          break;
      }
    });

    const percentage = Math.round(
      (filledFields / REQUIRED_FIELDS.length) * 100,
    );
    return percentage;
  }, [user, isLoading, isError]);

  return {
    completionPercentage,
    isLoading,
    isError,
    user,
  };
};
