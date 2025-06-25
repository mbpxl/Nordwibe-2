const HashTag: React.FC<{ hashtagTitle: string }> = ({ hashtagTitle }) => {
  return (
    <>
      <div className="text-[0.75rem] font-medium leading-[0.5rem] text-center bg-[#6B6B6B] text-white py-1 px-2 rounded-[12px]">
        #{hashtagTitle}
      </div>
    </>
  );
};

export default HashTag;
