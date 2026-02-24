import React, { useState, useEffect } from "react";
import { GoBackButton } from "../../../../shared/Components/GoBackButton/GoBackButton";
import TopicHeader from "../../../../shared/Components/TopicHeader/TopicHeader";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import Budget from "../../../EditProfilePage/components/Budget/Budget";
import InlineSelect from "../../../EditProfilePage/components/InlineSelect/InlineSelect";
import SuggestionField from "../../../EditProfilePage/components/SuggestionField/SuggestionField";
import { useGetCities } from "../../../EditProfilePage/service/useGetCity";
import { initialFilterState, type FilterType } from "../../types/filterTypes";
import DoubleRangeSlider from "./DoubleRangeSlider";

interface FilterProps {
  onCloseFilter: () => void;
  onApplyFilters: (filters: FilterType) => void;
  initialFilters?: FilterType;
  isDesktop?: boolean;
}

const defaultFilters: FilterType = initialFilterState;

const Filter: React.FC<FilterProps> = ({
  onCloseFilter,
  onApplyFilters,
  initialFilters = defaultFilters,
  isDesktop = false,
}) => {
  const [filters, setFilters] = useState<FilterType>({
    ...defaultFilters,
    ...initialFilters,
  });

  const [cityInputValue, setCityInputValue] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [budget, setBudget] = useState<{ min: string; max: string }>({
    min: filters.budget_from?.toString() || "",
    max: filters.budget_to?.toString() || "",
  });

  const { data: cities = [], isLoading: isCitiesLoading } =
    useGetCities(cityInputValue);

  useEffect(() => {
    if (initialFilters.city_id && initialFilters.city_name) {
      setSelectedCity({
        id: initialFilters.city_id,
        name: initialFilters.city_name,
      });
      setCityInputValue(initialFilters.city_name);
    }
  }, [initialFilters.city_id, initialFilters.city_name]);

  useEffect(() => {
    const updateArrayField = (fieldName: keyof FilterType) => {
      const value = initialFilters[fieldName];
      if (value) {
        let normalizedValue: string[] | null = null;

        if (Array.isArray(value)) {
          normalizedValue = value;
        } else if (typeof value === "string") {
          normalizedValue = [value];
        }

        if (normalizedValue) {
          setFilters((prev) => ({
            ...prev,
            [fieldName]: normalizedValue,
          }));
        }
      }
    };

    updateArrayField("occupation");
    updateArrayField("pets");
    updateArrayField("smoking_status");
  }, [
    initialFilters.occupation,
    initialFilters.pets,
    initialFilters.smoking_status,
  ]);

  const handleAgeChange = (values: { min: number; max: number }) => {
    setFilters((prev) => ({
      ...prev,
      age_from: values.min,
      age_to: values.max,
    }));
  };

  const handleBudgetChange = (newBudget: { min: string; max: string }) => {
    setBudget(newBudget);
    setFilters((prev) => ({
      ...prev,
      budget_from: newBudget.min ? parseInt(newBudget.min) : null,
      budget_to: newBudget.max ? parseInt(newBudget.max) : null,
    }));
  };

  const handleCitySelect = (city: { id: string; name: string } | null) => {
    setSelectedCity(city);
    if (city) {
      setCityInputValue(city.name);
      setFilters((prev) => ({
        ...prev,
        city_id: city.id,
        city_name: city.name,
      }));
    } else {
      setCityInputValue("");
      setFilters((prev) => ({
        ...prev,
        city_id: null,
        city_name: null,
      }));
    }
  };

  const handleApply = () => {
    onApplyFilters(filters);
    if (!isDesktop) {
      onCloseFilter();
    }
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setSelectedCity(null);
    setCityInputValue("");
    setBudget({ min: "", max: "" });
  };

  return (
    <>
      {!isDesktop && (
        <Wrapper className="min-h-screen pb-22 overflow-hidden">
          <TopicHeader>
            <GoBackButton fromFilter={true} />
            <h1>Фильтры</h1>
          </TopicHeader>

          <div className="space-y-6">
            <div className="mt-4">
              <h1 className="text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
                Возраст
              </h1>
              <DoubleRangeSlider
                min={18}
                max={100}
                values={{
                  min: filters.age_from || 18,
                  max: filters.age_to || 100,
                }}
                onChange={handleAgeChange}
              />
            </div>

            <InlineSelect
              title="Род занятий"
              options={["Учусь", "Работаю", "Работаю из дома", "Ищу работу"]}
              value={filters.occupation}
              onChange={(values) =>
                setFilters((prev) => ({ ...prev, occupation: values }))
              }
              multiple={true}
              maxSelections={4}
            />

            <InlineSelect
              title="Домашние животные"
              options={["Нет", "Аллергия", "Есть"]}
              value={filters.pets}
              onChange={(values) =>
                setFilters((prev) => ({ ...prev, pets: values }))
              }
              multiple={true}
              maxSelections={3}
            />

            <InlineSelect
              title="Курение"
              options={[
                "Не курю",
                "Редко",
                "Часто",
                "Вейп",
                "Нейтрально",
                "Аллергия",
              ]}
              value={filters.smoking_status}
              onChange={(values) =>
                setFilters((prev) => ({ ...prev, smoking_status: values }))
              }
              multiple={true}
              maxSelections={6}
            />

            <SuggestionField
              title="Родной город"
              value={selectedCity}
              onChange={handleCitySelect}
              suggestions={cities}
              isLoading={isCitiesLoading}
              isError={false}
            />

            <Budget budget={budget} setBudget={handleBudgetChange} />

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Сбросить
              </button>
              <button
                onClick={handleApply}
                className="flex-1 bg-purple-main text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Применить
              </button>
            </div>
          </div>
        </Wrapper>
      )}

      {isDesktop && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Фильтры</h2>

          <div className="space-y-6">
            <div className="mt-4">
              <h1 className="text-base font-semibold mb-3 text-gray-700">
                Возраст
              </h1>
              <DoubleRangeSlider
                min={18}
                max={100}
                values={{
                  min: filters.age_from || 18,
                  max: filters.age_to || 100,
                }}
                onChange={handleAgeChange}
              />
            </div>

            <InlineSelect
              title="Род занятий"
              options={["Учусь", "Работаю", "Работаю из дома", "Ищу работу"]}
              value={filters.occupation}
              onChange={(values) =>
                setFilters((prev) => ({ ...prev, occupation: values }))
              }
              multiple={true}
              maxSelections={4}
            />

            <InlineSelect
              title="Домашние животные"
              options={["Нет", "Аллергия", "Есть"]}
              value={filters.pets}
              onChange={(values) =>
                setFilters((prev) => ({ ...prev, pets: values }))
              }
              multiple={true}
              maxSelections={3}
            />

            <InlineSelect
              title="Курение"
              options={[
                "Не курю",
                "Редко",
                "Часто",
                "Вейп",
                "Нейтрально",
                "Аллергия",
              ]}
              value={filters.smoking_status}
              onChange={(values) =>
                setFilters((prev) => ({ ...prev, smoking_status: values }))
              }
              multiple={true}
              maxSelections={6}
            />

            <SuggestionField
              title="Родной город"
              value={selectedCity}
              onChange={handleCitySelect}
              suggestions={cities}
              isLoading={isCitiesLoading}
              isError={false}
            />

            <Budget budget={budget} setBudget={handleBudgetChange} />

            <div className="flex gap-3 pt-6">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Сбросить
              </button>
              <button
                onClick={handleApply}
                className="flex-1 bg-purple-main text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
