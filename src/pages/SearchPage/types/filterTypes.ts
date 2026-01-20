export interface FilterType {
  sex: string | null;
  age_from: number;
  age_to: number;
  city_id: string | null;
  city_name: string | null;
  budget_from: number | null;
  budget_to: number | null;
  occupation: string[] | null;
  smoking_status: string[] | null;
  pets: string[] | null;
  profession: string | null;
}

export const initialFilterState: FilterType = {
  sex: null,
  age_from: 18,
  age_to: 100,
  city_id: null,
  city_name: null,
  budget_from: null,
  budget_to: null,
  occupation: null,
  smoking_status: null,
  pets: null,
  profession: null,
};
