const HashTag: React.FC<{
  hashtagTitle: string;
  onRemove?: () => void;
  isCreating?: boolean;
  isFavorite?: boolean;
  isNotFavorite?: boolean;
}> = ({ hashtagTitle, onRemove, isCreating, isFavorite, isNotFavorite }) => {
  return (
    <div
      className={`flex items-center gap-1 ${
        isFavorite
          ? "bg-[#05A300]"
          : isNotFavorite
          ? "bg-[#FF2727]"
          : "bg-purple-main"
      }  text-white px-2 py-1 rounded-[12px]`}
    >
      <span className="text-[0.75rem] font-medium leading-[0.5rem]">
        #{hashtagTitle}
      </span>
      {isCreating && (
        <button
          aria-label={`Удалить #${hashtagTitle}`}
          onClick={onRemove}
          className="p-0.5 rounded-full hover:bg-purple-700 transition"
        >
          <img className="w-2 h-2" src="/icons/closeModal.svg" alt="close" />
        </button>
      )}
    </div>
  );
};

export default HashTag;
