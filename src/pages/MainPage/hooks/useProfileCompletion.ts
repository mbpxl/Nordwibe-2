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
  age: number;
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
  "name",
  "usage_goal",
  "desired_length",
  "chronotype",
  "max_budget",
  "occupation",
  "smoking_status",
  "gender",
  "pets",
  "religion",
  "about",
  "age",
  "city_name",
  "hometown_name",
  "hashtags_list",
  "avatar_url",
];

const NON_EMPTY_FIELDS: (keyof UserProfile)[] = [
  "username",
  "name",
  "usage_goal",
  "desired_length",
  "chronotype",
  "occupation",
  "smoking_status",
  "gender",
  "pets",
  "religion",
  "about",
  "city_name",
  "hometown_name",
];

export const useProfileCompletion = () => {
  const { data: user, isLoading, isError } = useGetMe();

  const completionPercentage = useMemo(() => {
    if (!user || isLoading || isError) {
      return 0;
    }

    let filledFields = 0;
    const totalFields = REQUIRED_FIELDS.length;

    REQUIRED_FIELDS.forEach((field) => {
      const value = user[field];

      if (NON_EMPTY_FIELDS.includes(field)) {
        if (typeof value === "string" && value.trim().length > 0) {
          filledFields++;
        } else if (
          field === "hashtags_list" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          filledFields++;
        } else if (typeof value === "number" && value > 0) {
          filledFields++;
        }
      } else {
        if (value !== null && value !== undefined) {
          filledFields++;
        }
      }
    });

    return Math.round((filledFields / totalFields) * 100);
  }, [user, isLoading, isError]);

  return {
    completionPercentage,
    isLoading,
    isError,
    user,
  };
};
