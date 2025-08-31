import { useState, useEffect } from "react";
import TopicHeader from "../../../../shared/Components/TopicHeader/TopicHeader";
import arrowLeft from "/icons/arrow-left.svg";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import InlineSelect from "../../../EditProfilePage/components/InlineSelect/InlineSelect";
import SuggestionField from "../../../EditProfilePage/components/SuggestionField/SuggestionField";
import { useGetCities } from "../../../EditProfilePage/service/useGetCity";
import Budget from "../../../EditProfilePage/components/Budget/Budget";
import { useGetHashtag } from "../../../EditProfilePage/service/useHashtag";
import SubmitFilter from "./SubmitFilter";

const LOCAL_STORAGE_KEY = "search_filter";

type FilterState = {
  smokingOption: string | null;
  religionOption: string | null;
  cityValue: {
    id: string;
    name: string;
  };
  budget: { min: string; max: string };
  durationOption: string | null;
  favoriteHashtagsList: { id: string; name: string }[];
  notFavoriteHashtagsList: { id: string; name: string }[];
};

const defaultState: FilterState = {
  smokingOption: null,
  religionOption: null,
  cityValue: {
    id: "",
    name: "",
  },
  budget: { min: "", max: "" },
  durationOption: null,
  favoriteHashtagsList: [],
  notFavoriteHashtagsList: [],
};

const Filter: React.FC<{ onCloseFilter: () => void }> = ({ onCloseFilter }) => {
  const [filterState, setFilterState] = useState<FilterState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filterState));
  }, [filterState]);

  const {
    smokingOption,
    religionOption,
    cityValue,
    budget,
    durationOption,
    favoriteHashtagsList,
    notFavoriteHashtagsList,
  } = filterState;

  const [favoriteHashtagInput, setFavoriteHashtagInput] = useState<string>("");
  const [notFavoriteHashtagInput, setNotFavoriteHashtagInput] =
    useState<string>("");

  const {
    data: cities = [],
    isLoading,
    isError: isCitiesError,
  } = useGetCities(cityValue?.name || "");

  console.log(filterState);

  const {
    data: hashtagSuggestions = [],
    isLoading: isLoadingHashTags,
    isError: isHashTagError,
  } = useGetHashtag(favoriteHashtagInput || notFavoriteHashtagInput);

  const updateState = (patch: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...patch }));
  };

  const safeFavoriteAddChip = (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    const existingTag = hashtagSuggestions.find(
      (h: any) => h.name.toLowerCase() === text.toLowerCase()
    );

    updateState({
      favoriteHashtagsList: existingTag
        ? filterState.favoriteHashtagsList.some((t) => t.id === existingTag.id)
          ? filterState.favoriteHashtagsList
          : [...filterState.favoriteHashtagsList, existingTag]
        : filterState.favoriteHashtagsList.some(
            (t) => t.name.toLowerCase() === text.toLowerCase()
          )
        ? filterState.favoriteHashtagsList
        : [...filterState.favoriteHashtagsList, { id: "", name: text }],
    });

    setFavoriteHashtagInput("");
  };

  const safeNotFavoriteAddChip = (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    const existingTag = hashtagSuggestions.find(
      (h: any) => h.name.toLowerCase() === text.toLowerCase()
    );

    updateState({
      notFavoriteHashtagsList: existingTag
        ? filterState.notFavoriteHashtagsList.some(
            (t) => t.id === existingTag.id
          )
          ? filterState.notFavoriteHashtagsList
          : [...filterState.notFavoriteHashtagsList, existingTag]
        : filterState.notFavoriteHashtagsList.some(
            (t) => t.name.toLowerCase() === text.toLowerCase()
          )
        ? filterState.notFavoriteHashtagsList
        : [...filterState.notFavoriteHashtagsList, { id: "", name: text }],
    });

    setNotFavoriteHashtagInput("");
  };

  const handleRemoveFavoriteHashTag = (tagName: string) => {
    updateState({
      favoriteHashtagsList: filterState.favoriteHashtagsList.filter(
        (t) => t.name !== tagName
      ),
    });
  };

  const handleRemoveNotFavoriteHashTag = (tagName: string) => {
    updateState({
      notFavoriteHashtagsList: filterState.notFavoriteHashtagsList.filter(
        (t) => t.name !== tagName
      ),
    });
  };

  return (
    <div className="pb-28">
      <Wrapper>
        <TopicHeader>
          <button onClick={onCloseFilter}>
            <img src={arrowLeft} alt="<" />
          </button>
          <h1>Фильтр</h1>
        </TopicHeader>

        <InlineSelect
          title="Курение"
          options={["Редко", "Часто", "Вейп", "Нейтрально", "Аллергия"]}
          value={smokingOption}
          onChange={(val) => updateState({ smokingOption: val })}
        />

        <InlineSelect
          title="Религиозное предпочтение"
          options={[
            "Христианство",
            "Ислам",
            "Иудаизм",
            "Буддизм",
            "Атеизм",
            "Другое",
          ]}
          value={religionOption}
          onChange={(val) => updateState({ religionOption: val })}
        />

        <SuggestionField
          title={"Город"}
          value={cityValue}
          onChange={(val) => updateState({ cityValue: val })}
          suggestions={cities}
          isLoading={isLoading}
          isError={isCitiesError}
        />

        <Budget
          budget={budget}
          setBudget={(val) => updateState({ budget: val })}
        />

        <InlineSelect
          title="Длительность проживания"
          options={[
            "Несколько дней",
            "До 3 месяцев",
            "До полугода",
            "Год",
            "Больше года",
          ]}
          value={durationOption}
          onChange={(val) => updateState({ durationOption: val })}
        />

        <SuggestionField
          title={"Меня интересует"}
          value={favoriteHashtagInput}
          onChange={setFavoriteHashtagInput}
          suggestions={hashtagSuggestions}
          multiple
          chips={favoriteHashtagsList.map((t) => t.name)}
          onAddChip={safeFavoriteAddChip}
          onRemoveChip={handleRemoveFavoriteHashTag}
          isLoading={isLoadingHashTags}
          isError={isHashTagError}
          favorite
        />

        <SuggestionField
          title={"Меня не интересует"}
          value={notFavoriteHashtagInput}
          onChange={setNotFavoriteHashtagInput}
          suggestions={hashtagSuggestions}
          multiple
          chips={notFavoriteHashtagsList.map((t) => t.name)}
          onAddChip={safeNotFavoriteAddChip}
          onRemoveChip={handleRemoveNotFavoriteHashTag}
          isLoading={isLoadingHashTags}
          isError={isHashTagError}
          notFavorite
        />
        <SubmitFilter />
      </Wrapper>
    </div>
  );
};

export default Filter;
