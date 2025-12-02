import { useMediaQuery } from "react-responsive";

const Loading = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const desktopLoading = (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img
        className="w-12 h-12"
        src="/icons/loading-desktop.svg"
        alt="loading"
      />
    </div>
  );

  const mobileLoading = (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img
        className="w-12 h-12 animate-spin"
        src={"/icons/loading/loading.svg"}
        alt="loading"
      />
    </div>
  );

  return <>{isDesktop ? desktopLoading : mobileLoading}</>;
};

export default Loading;
