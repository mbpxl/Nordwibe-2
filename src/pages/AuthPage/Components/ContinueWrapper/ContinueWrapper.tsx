const ContinueWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section className="max-w-[400px] fixed top-[80vh] left-1 right-1 inset-x-0 mx-auto font-bold text-[1.125rem] leading-[1.25rem] text-white">
      {children}
    </section>
  );
};

export default ContinueWrapper;
