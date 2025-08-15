import { useState } from "react";
import { GoBackButton } from "../../shared/Components/GoBackButton/GoBackButton";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Wrapper from "../../shared/Components/Wrapper/Wrapper";
import InlineSelect from "./components/InlineSelect/InlineSelect";
import SuggestionField from "./components/SuggestionField/SuggestionField";
import { cities } from "./misc/cities";

const EditProfilePage = () => {
  const [petOption, setPetOption] = useState<string | null>(null);
  const [animalType, setAnimalType] = useState<string | null>(null);
  const [smokingOption, setSmokingOption] = useState<string | null>(null);
  const [religionOption, setReligionOption] = useState<string | null>(null);
  const [durationOption, setDurationOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <TopicHeader>
        <GoBackButton />
        <h1>Редактирование</h1>
      </TopicHeader>

      <Wrapper>
        <InlineSelect
          title="Домашние животные"
          options={["Нет животных", "Аллергия", "Есть"]}
          value={petOption}
          onChange={setPetOption}
        />

        {petOption !== "Нет животных" &&
          petOption !== "Аллергия" &&
          petOption !== null && (
            <InlineSelect
              title="Какое у вас животное?"
              options={["1", "2", "3"]}
              value={animalType}
              onChange={setAnimalType}
            />
          )}

        <InlineSelect
          title="Курение"
          options={["Нет", "Сигареты", "Электронные сигареты", "Другое"]}
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
					value={inputValue}
					onChange={setInputValue}
					suggestionsList={cities}
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
          onChange={setDurationOption}
        />

				<SuggestionField
					title={"Интересы"}
					value={inputValue}
					onChange={setInputValue}
					suggestionsList={cities}
					/>
      </Wrapper>
    </>
  );
};

export default EditProfilePage;
