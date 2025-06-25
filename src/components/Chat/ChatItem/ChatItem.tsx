const ChatItem = () => {
  const text =
    "Привет, я хочу познакомиться поближе, чтобы понять подходим ли мы по интелекутальныс спомосбфрыв";

  return (
    <>
      <div className="bg-[#A0A0A0] p-2 flex gap-3 max-w-[700px] rounded-[12px]">
        <div className="w-[60px] h-[60px] bg-amber-950 rounded-[50%] shrink-0">
          {/* <img src="" alt="" /> */}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-[0.875rem] font-semibold leading-5 text-left">
            Поддержка
          </h2>
          <p className="text-[#6B6B6B] text-[0.75rem] font-medium leading-4 text-left">
            {text.slice(0, 54) + "..."}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatItem;
