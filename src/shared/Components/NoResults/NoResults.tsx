import Wrapper from "../Wrapper/Wrapper";

const NoResults = () => {
  return (
    <Wrapper className="bg-purple-background-wrap min-h-screen">
      <div className="flex flex-col items-center text-center text-purple-main-disabled text-[1.125rem] font-bold leading-6">
        <img
          className="w-[120px] h-[120px] mt-[50%]"
          src="/icons/no-results.svg"
          alt="no results"
        />
        <h1>Похоже никого не нашлось! Попробуйте изменить фильтр.</h1>
      </div>
    </Wrapper>
  );
};

export default NoResults;
