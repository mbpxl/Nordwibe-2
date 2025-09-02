interface IWrapper {
  children: React.ReactNode;
  className?: string | null;
}

const Wrapper: React.FC<IWrapper> = ({ children, className }) => {
  const combinedClassName = ["px-3", className].filter(Boolean).join(" ");

  return <div className={combinedClassName}>{children}</div>;
};

export default Wrapper;
