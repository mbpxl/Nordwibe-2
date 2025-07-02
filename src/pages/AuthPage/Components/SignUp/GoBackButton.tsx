import goBackIcon from "/icons/arrow-left.svg";

const GoBackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <article className="pl-3">
      <button onClick={onBack}>
        <img src={goBackIcon} alt="Go Back" />
      </button>
    </article>
  );
};

export default GoBackButton;
