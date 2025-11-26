import { useEffect, useRef, useState } from "react";
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
import WrongData from "../AuthPage/Components/PhoneErrorMsg/PhoneErrorMsg";
import PrivateSettingsList from "./components/Privacy/PrivateSettingsList/PrivateSettingsList";

const EditProfilePage = () => {
  const {
    data: myProfileData,
    isLoading: isProfileDataLoading,
    isError: isProfileDataError,
  } = useGetMe();

  const navigate = useNavigate();
  const { fillProfile, isPending, isSuccess } = useFillProfile();

  const [nameValue, setNameValue] = useState<string>("");
  const [loginValue, setLoginValue] = useState<string>("");
  const [genderValue, setGenderValue] = useState<"Мужской" | "Женский" | null>(
    null
  );
  const { date, inputRef, handleChange } = useFormatBirthDate("");
  const [ageError, setAgeError] = useState<boolean>(false);
  const [usageGoalOption, setUsageGoalOption] = useState<string | null>(null);
  const [petOption, setPetOption] = useState<string | null>(null);
  const [animalType, setAnimalType] = useState<string | null>(null);
  const [smokingOption, setSmokingOption] = useState<string | null>(null);
  const [religionOption, setReligionOption] = useState<
    | "Нейтрально"
    | "Христианство"
    | "Ислам"
    | "Иудаизм"
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

  const birthFieldRef = useRef<HTMLDivElement>(null);

  const [isFormTouched, setIsFormTouched] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "privacy">("edit");

  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [isAddHashTagClick, setIsAddHashTagClick] = useState<boolean>(false);
  const [newHashTagValue, setNewHashTagValue] = useState<string>("");
  const [pendingCreatedTag, setPendingCreatedTag] = useState<string | null>(
    null
  );

  const isUserOver18 = (birthDate: string): boolean => {
    if (!birthDate || birthDate.length !== 10) return false;

    try {
      const [day, month, year] = birthDate.split("/").map(Number);
      const birthDateObj = new Date(year, month - 1, day);
      const today = new Date();

      let age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
      ) {
        age--;
      }

      return age >= 18;
    } catch (error) {
      console.error("Error calculating age:", error);
      return false;
    }
  };

  const scrollToBirthField = () => {
    birthFieldRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const normalizeHashtags = (hashtags: any): { id: string; name: string }[] => {
    if (!hashtags) return [];

    if (
      Array.isArray(hashtags) &&
      hashtags.length > 0 &&
      typeof hashtags[0] === "object" &&
      hashtags[0].id !== undefined
    ) {
      return hashtags.map((tag) => ({
        id: String(tag.id),
        name: tag.name || tag.title || String(tag),
      }));
    }

    if (
      Array.isArray(hashtags) &&
      hashtags.length > 0 &&
      typeof hashtags[0] === "string"
    ) {
      return hashtags.map((tag) => ({ id: "", name: tag }));
    }

    if (hashtags && typeof hashtags === "object" && hashtags.id !== undefined) {
      return [
        {
          id: String(hashtags.id),
          name: hashtags.name || hashtags.title || String(hashtags),
        },
      ];
    }

    if (typeof hashtags === "string") {
      return [{ id: "", name: hashtags }];
    }

    return [];
  };

  useEffect(() => {
    if (myProfileData && !isInitialized) {
      console.log("Initializing form with profile data:", myProfileData);

      // Основные данные
      setNameValue(myProfileData.username || "");
      setLoginValue(myProfileData.name || ""); // Инициализация логина
      setGenderValue(myProfileData.gender || "");
      setUsageGoalOption(myProfileData.usage_goal || null); // Инициализация цели использования

      // Выборы
      setPetOption(myProfileData.pets || null);
      setAnimalType(myProfileData.animal_type || null);
      setSmokingOption(myProfileData.smoking_status || null);
      setReligionOption(myProfileData.religion || null);
      setDurationOption(myProfileData.desired_length || null);

      // Родной город
      if (myProfileData.hometown_id || myProfileData.hometown_name) {
        setCityValue({
          id: myProfileData.hometown_id || "",
          name: myProfileData.hometown_name || "",
        });
      }

      // Бюджет
      setBudget({
        min: myProfileData.min_budget ? String(myProfileData.min_budget) : "",
        max: myProfileData.max_budget ? String(myProfileData.max_budget) : "",
      });

      // Хештеги
      console.log("Raw hashtags from API:", myProfileData.hashtags_list);

      if (myProfileData.hashtags_list) {
        const normalizedHashtags = normalizeHashtags(
          myProfileData.hashtags_list
        );
        console.log("Normalized hashtags:", normalizedHashtags);
        setHashtagsList(normalizedHashtags);
      } else {
        console.log("No hashtags found in profile data");
        setHashtagsList([]);
      }

      setIsInitialized(true);
    }
  }, [myProfileData, isInitialized]);

  useEffect(() => {
    if (!isFormTouched && isInitialized) {
      setIsFormTouched(true);
    }
  }, [
    nameValue,
    loginValue,
    date,
    usageGoalOption,
    petOption,
    smokingOption,
    religionOption,
    cityValue,
    budget,
    durationOption,
    hashtagsList,
    isInitialized,
  ]);

  const isBirthDateValid = date && date.length === 10;
  const isAgeValid = isBirthDateValid && isUserOver18(date);

  const birthDate = isBirthDateValid
    ? new Date(date.split("/").reverse().join("-")).toISOString()
    : "";

  const updatedUserData = {
    ...(nameValue !== myProfileData?.username && { username: nameValue }),
    ...(loginValue !== myProfileData?.name && { name: loginValue }),
    ...(genderValue !== myProfileData?.gender && { gender: genderValue }),
    ...(isBirthDateValid && { birth_date: birthDate }),
    ...(usageGoalOption !== myProfileData?.usage_goal && {
      usage_goal: usageGoalOption,
    }),
    ...(petOption !== myProfileData?.pets && { pets: petOption }),
    ...(animalType !== myProfileData?.animal_type && {
      animal_type: animalType,
    }),
    ...(smokingOption !== myProfileData?.smoking_status && {
      smoking_status: smokingOption,
    }),
    ...(religionOption !== myProfileData?.religion && {
      religion: null,
    }),
    ...(cityValue?.id !== myProfileData?.hometown_id && {
      hometown_id: cityValue?.id,
    }),
    ...(cityValue?.name !== myProfileData?.hometown_name && {
      hometown_name: cityValue?.name,
    }),
    ...(budget.min !== String(myProfileData?.min_budget || "") && {
      min_budget: +budget.min,
    }),
    ...(budget.max !== String(myProfileData?.max_budget || "") && {
      max_budget: +budget.max,
    }),
    ...(durationOption !== myProfileData?.desired_length && {
      desired_length: durationOption,
    }),
    ...{
      hashtags_ids: hashtagsList.filter((t) => t.id).map((t) => t.id) || [],
    },
  };

  const filteredUserData = Object.fromEntries(
    Object.entries(updatedUserData).filter(([_, value]) => {
      if (value === null || value === undefined) return false;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "number") return true;
      return true;
    })
  );

  const handleUpdateProfileData = () => {
    if (!isBirthDateValid) {
      scrollToBirthField();
      return;
    }

    if (!isAgeValid) {
      setAgeError(true);
      setTimeout(() => {
        scrollToBirthField();
      }, 100);
      return;
    }

    setAgeError(false);

    const dataToSend = {
      ...filteredUserData,
      ...(isBirthDateValid && { birth_date: birthDate }),
    };

    console.log("Sending data:", dataToSend);
    fillProfile({ ...myProfileData, ...dataToSend });
  };

  useEffect(() => {
    if (ageError && isBirthDateValid) {
      setAgeError(!isUserOver18(date));
    }
  }, [date, ageError, isBirthDateValid]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }
  }, [isSuccess, navigate]);

  const {
    data: cities = [],
    isLoading,
    isError: isCitiesError,
  } = useGetCities(cityValue?.name || "");

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

  const hasChanges = Object.keys(filteredUserData).length > 0;

  return (
    <>
      <Wrapper className={"flex flex-col items-center pb-22"}>
        <TopicHeader>
          <GoBackButton />
          <h1>Редактирование</h1>
        </TopicHeader>

        {/* Вкладки */}
        <div className="flex justify-center w-full max-w-md mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1 w-full">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "edit"
                  ? "bg-white text-purple-main shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Редактирование
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "privacy"
                  ? "bg-white text-purple-main shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Приватность
            </button>
          </div>
        </div>

        {/* Контент вкладок */}
        {activeTab === "edit" ? (
          <div className="w-full">
            <TextField
              title={"Как вас зовут?"}
              value={nameValue}
              onChange={setNameValue}
              placeholder={"Имя"}
            />

            <div className="mt-4">
              <TextField
                title={"Придумайте себе логин"}
                value={loginValue}
                onChange={setLoginValue}
                placeholder={"Логин"}
              />
            </div>

            <InlineSelect
              title="Пол"
              options={["Мужской", "Женский"]}
              value={genderValue}
              onChange={setGenderValue}
            />

            <div ref={birthFieldRef}>
              <BirthField
                title={"Дата рождения *"}
                value={date}
                onChange={handleChange}
                ref={inputRef}
                error={
                  !isBirthDateValid && isFormTouched
                    ? "Обязательное поле"
                    : undefined
                }
                ageError={ageError}
              />
            </div>

            <InlineSelect
              title="Цель"
              options={[
                "Поиск соседа",
                "Поиск жилья",
                "Сдать жильё",
                "Поиск комнаты",
              ]}
              value={usageGoalOption}
              onChange={setUsageGoalOption}
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
              options={[
                "Не курю",
                "Редко",
                "Часто",
                "Вейп",
                "Нейтрально",
                "Аллергия",
              ]}
              value={smokingOption}
              onChange={setSmokingOption}
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
              isDisabled={
                isProfileDataError ||
                isProfileDataLoading ||
                !isBirthDateValid ||
                !hasChanges ||
                ageError
              }
              isPending={isPending}
              onSubmit={handleUpdateProfileData}
            />
            <WrongData
              isError={Boolean(!isBirthDateValid)}
              message={"Заполните дату рождения"}
            />
          </div>
        ) : (
          <div className="w-full">
            <PrivateSettingsList />
          </div>
        )}
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
