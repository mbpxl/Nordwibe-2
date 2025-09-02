const SupportChat = () => {
  return (
    <>
      <div className="bg-white p-2 flex gap-3 max-w-[700px] rounded-[12px]">
        <div className="w-[60px] h-[60px] rounded-[50%] shrink-0">
          <img src="/icons/nordwibe/nordwibe.svg" alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-[0.875rem] text-black-heading font-semibold leading-5 text-left">
            Поддержка
          </h2>
          <p className="text-black-heading text-[0.8rem] font-medium leading-4 text-left">
            Здесь вы можете задать свой вопрос или обратиться за помощью!
          </p>
        </div>
      </div>
    </>
  );
};

export default SupportChat;
