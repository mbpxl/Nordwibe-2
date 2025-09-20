import { useEffect, useState } from "react";
import { GoBackButton } from "../../shared/Components/GoBackButton/GoBackButton";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Wrapper from "../../shared/Components/Wrapper/Wrapper";
import InlineSelect from "./components/InlineSelect/InlineSelect";
import SuggestionField from "./components/SuggestionField/SuggestionField";
import { useGetCities } from "./service/useGetCity";
import Budget from "./components/Budget/Budget";
import { useCreateHashtag, useGetHashtag } from "./service/useHashtag";
import Modal from "../../shared/Components/Modal/Modal";
import SaveButton from "./components/SaveButton/SaveButton";
import { useGetMe } from "../ProfilePage/service/useGetMe";
import { useFillProfile } from "../../shared/service/useFillProfileInfo";
import { useNavigate } from "react-router-dom";
import TextField from "./components/TextField/TextField";
import BirthField from "./components/BirthField/BirthField";
import useFormatBirthDate from "../AuthPage/hooks/useFormatBirthDate";

const EditProfilePage = () => {
  // получаем данные о себе, чтобы заполнить недостающие поля для обновления профиля
  const {
    data: myProfileData,
    isLoading: isProfileDataLoading,
    isError: isProfileDataError,
  } = useGetMe();

  const naviagate = useNavigate();

  const { fillProfile, isPending, isSuccess } = useFillProfile();
  if (isSuccess) {
    naviagate("/profile");
  }

  const [nameValue, setNameValue] = useState<string>("");
  const { date, inputRef, handleChange } = useFormatBirthDate("");
  const [petOption, setPetOption] = useState<string | null>(null);
  const [animalType, setAnimalType] = useState<string | null>(null);
  const [smokingOption, setSmokingOption] = useState<string | null>(null);
  const [religionOption, setReligionOption] = useState<
    | "Нейтрально"
    | "Христианство"
    | "Ислам"
    | "Иидуизм"
    | "Буддизм"
    | "Атеизм"
    | null
  >(null);
  const [durationOption, setDurationOption] = useState<string | null>(null);
  const [cityValue, setCityValue] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [budget, setBudget] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [hashtagsList, setHashtagsList] = useState<
    { id: string; name: string }[]
  >([]);

  const birthDate =
    date && date.length === 10
      ? new Date(date.split("/").reverse().join("-")).toISOString()
      : "";

  const updatedUserData = {
    username: nameValue || myProfileData.userName || null,
    pets: petOption || myProfileData.pets || null,
    birth_date: birthDate || myProfileData.bith_date || null,
    smoking_status: smokingOption || myProfileData.smoking_status || null,
    religion: religionOption || myProfileData.religion || null,
    hometown_id: cityValue?.id || null,
    max_budget: +budget.max || myProfileData.max_budget || null,
    desired_length: durationOption || myProfileData.desired_length || null,
    hashtags_ids: hashtagsList.filter((t) => t.id).map((t) => t.id) || myProfileData.hashtags_ids || [],
  };


  const handleUpdateProfileData = () => {
    fillProfile({ ...myProfileData, ...updatedUserData });
  };

  const {
    data: cities = [],
    isLoading,
    isError: isCitiesError,
  } = useGetCities(cityValue?.name || "");

  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [isAddHashTagClick, setIsAddHashTagClick] = useState<boolean>(false);
  const [newHashTagValue, setNewHashTagValue] = useState<string>("");

  const [pendingCreatedTag, setPendingCreatedTag] = useState<string | null>(
    null
  );

  const {
    data: hashtagSuggestions = [],
    isLoading: isLoadingHashTags,
    isError: isHashTagError,
  } = useGetHashtag(hashtagInput);

  const {
    mutate: createHashtag,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
  } = useCreateHashtag();

  const safeAddChip = (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    const existingTag = hashtagSuggestions.find(
      (h: any) => h.name.toLowerCase() === text.toLowerCase()
    );

    if (existingTag) {
      setHashtagsList((prev) => {
        const exists = prev.some((t) => t.id === existingTag.id);
        return exists ? prev : [...prev, existingTag];
      });
    } else {
      setHashtagsList((prev) => {
        const exists = prev.some(
          (t) => t.name.toLowerCase() === text.toLowerCase()
        );
        return exists ? prev : [...prev, { id: "", name: text }];
      });
    }

    setHashtagInput("");
  };

  const handleRemoveHashTag = (tagName: string) => {
    setHashtagsList((prev) => prev.filter((t) => t.name !== tagName));
  };

  useEffect(() => {
    if (isCreateSuccess && pendingCreatedTag) {
      safeAddChip(pendingCreatedTag);
      setIsAddHashTagClick(false);
      setNewHashTagValue("");
      setPendingCreatedTag(null);
    }
  }, [isCreateSuccess, pendingCreatedTag]);
  console.log(birthDate);

  return (
    <>
      <Wrapper className={"flex flex-col items-center pb-22"}>
        <TopicHeader>
          <GoBackButton />
          <h1>Редактирование</h1>
        </TopicHeader>
        <div className="">
          <TextField
            title={"Как вас зовут?"}
            value={nameValue}
            onChange={setNameValue}
          />

          <BirthField
            title={"Дата рождения"}
            value={date}
            onChange={handleChange}
            ref={inputRef}
          />

          <InlineSelect
            title="Домашние животные"
            options={["Нет", "Аллергия", "Есть"]}
            value={petOption}
            onChange={setPetOption}
          />

          {petOption !== "Нет" &&
            petOption !== "Аллергия" &&
            petOption !== null && (
              <InlineSelect
                title="Какое у вас животное?"
                options={[
                  "🐱",
                  "🐶",
                  "🐹",
                  "🐭",
                  "🐰",
                  "🐟",
                  "🦜",
                  "🦎",
                  "🐢",
                  "🐍",
                  "🕷️",
                ]}
                value={animalType}
                onChange={setAnimalType}
              />
            )}

          <InlineSelect
            title="Курение"
            options={["Редко", "Часто", "Вейп", "Нейтрально", "Аллергия"]}
            value={smokingOption}
            onChange={setSmokingOption}
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
            onChange={setReligionOption}
          />

          <SuggestionField
            title={"Родной город"}
            value={cityValue}
            onChange={setCityValue}
            suggestions={cities}
            isLoading={isLoading}
            isError={isCitiesError}
          />

          <Budget budget={budget} setBudget={setBudget} />

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
            onChange={setDurationOption}
          />

          <SuggestionField
            title="Интересы"
            multiple
            value={hashtagInput}
            onChange={setHashtagInput}
            chips={hashtagsList.map((t) => t.name)}
            onAddChip={safeAddChip}
            onRemoveChip={handleRemoveHashTag}
            suggestions={hashtagSuggestions}
            isLoading={isLoadingHashTags}
            isError={isHashTagError}
            notFoundLabel="Такого хэштега нет! Хотите добавить?"
            onNotFoundClick={() => {
              setNewHashTagValue(hashtagInput.trim());
              setIsAddHashTagClick(true);
            }}
          />
          <SaveButton
            isDisabled={isProfileDataError || isProfileDataLoading}
            isPending={isPending}
            onSubmit={handleUpdateProfileData}
          />
        </div>
      </Wrapper>

      <Modal
        isOpen={isAddHashTagClick}
        closeModal={() => setIsAddHashTagClick(false)}
      >
        <h2 className="text-lg font-bold mb-4">Добавить новый хэштег</h2>
        <input
          type="text"
          value={newHashTagValue}
          onChange={(e) => setNewHashTagValue(e.target.value)}
          className="w-full border-2 rounded-xl border-gray-300 p-2 mb-4 focus:outline-none"
          placeholder="Введите хэштег"
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
            onClick={() => setIsAddHashTagClick(false)}
          >
            Отмена
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-purple-main text-white hover:bg-purple-700"
            onClick={() => {
              const payload = newHashTagValue.trim();
              if (!payload) return;
              setPendingCreatedTag(payload);
              createHashtag(payload);
            }}
            disabled={isCreatePending}
          >
            {isCreatePending ? "Добавляем..." : "Добавить"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditProfilePage;
