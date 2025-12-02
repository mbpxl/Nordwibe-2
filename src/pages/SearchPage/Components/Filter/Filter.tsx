// Filter.tsx (обновленная версия)
import React, { useState, useEffect } from "react";
import { GoBackButton } from "../../../../shared/Components/GoBackButton/GoBackButton";
import TopicHeader from "../../../../shared/Components/TopicHeader/TopicHeader";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import Budget from "../../../EditProfilePage/components/Budget/Budget";
import InlineSelect from "../../../EditProfilePage/components/InlineSelect/InlineSelect";
import SuggestionField from "../../../EditProfilePage/components/SuggestionField/SuggestionField";
import { useGetCities } from "../../../EditProfilePage/service/useGetCity";
import type { FilterType } from "../../types/filterTypes";
import DoubleRangeSlider from "./DoubleRangeSlider";

interface FilterProps {
  onCloseFilter: () => void;
  onApplyFilters: (filters: FilterType) => void;
  initialFilters?: FilterType;
  isDesktop?: boolean;
}

const Filter: React.FC<FilterProps> = ({
  onCloseFilter,
  onApplyFilters,
  initialFilters = {},
  isDesktop = false,
}) => {
  const [filters, setFilters] = useState<FilterType>({
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
    const resetFilters: FilterType = {
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

    setFilters(resetFilters);
    setSelectedCity(null);
    setCityInputValue("");
    setBudget({ min: "", max: "" });
  };

  return (
    <>
      {/* Мобильная версия */}
      {!isDesktop && (
        <Wrapper className="min-h-screen pb-22">
          <TopicHeader>
            <GoBackButton fromFilter={true} />
            <h1>Фильтры</h1>
          </TopicHeader>

          <div className="space-y-6">
            <InlineSelect
              title="Пол"
              options={["Мужской", "Женский"]}
              value={filters.sex}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, sex: value }))
              }
            />

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
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, occupation: value }))
              }
            />

            <InlineSelect
              title="Домашние животные"
              options={["Нет", "Аллергия", "Есть"]}
              value={filters.pets}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, pets: value }))
              }
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
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, smoking_status: value }))
              }
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

      {/* Desktop версия */}
      {isDesktop && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Фильтры</h2>

          <div className="space-y-6">
            <InlineSelect
              title="Пол"
              options={["Мужской", "Женский"]}
              value={filters.sex}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, sex: value }))
              }
            />

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
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, occupation: value }))
              }
            />

            <InlineSelect
              title="Домашние животные"
              options={["Нет", "Аллергия", "Есть"]}
              value={filters.pets}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, pets: value }))
              }
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
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, smoking_status: value }))
              }
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
