export type userTypes = {
  username: string;
  name?: string;
  usage_goal?: string;
  desired_length: string;
  chronotype?: string;
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
  onboarding_completed: string; //todo: backup to Date type
  full_registration_completed: string; //todo: backup to Date type
  avatar_url: string;
};
