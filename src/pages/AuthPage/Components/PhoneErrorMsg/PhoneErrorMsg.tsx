const WrongData: React.FC<{ isError: boolean; message: string }> = ({
  isError,
  message,
}) => {
  return (
    <div className="">
      <p
        className={`text-red-500 text-center text-sm ${
          isError ? "visible" : "invisible"
        }`}
      >
        {message}
      </p>
    </div>
  );
};

export default WrongData;
