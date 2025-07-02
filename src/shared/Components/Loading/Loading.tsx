import loading from "/icons/loading/loading.svg";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img className="w-12 h-12 animate-spin" src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
