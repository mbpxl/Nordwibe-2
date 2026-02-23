import { useOAuthStart } from "../../service/useOAuthStart";

export const OAuthButtons = () => {
  const { mutate: startOAuth, isPending } = useOAuthStart();

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={() => startOAuth("vk")}
        disabled={isPending}
        className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[#0077FF] hover:bg-[#0068E0] disabled:opacity-50 transition-colors text-white font-medium"
      >
        <VkIcon />
        Войти через VK
      </button>

      <button
        onClick={() => startOAuth("yandex")}
        disabled={isPending}
        className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[#FC3F1D] hover:bg-[#E5371A] disabled:opacity-50 transition-colors text-white font-medium"
      >
        <YandexIcon />
        Войти через Яндекс
      </button>
    </div>
  );
};

const VkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.496c.598-.19 1.365 1.26 2.179 1.815.615.422 1.083.33 1.083.33l2.177-.03s1.138-.071.598-..965c-.044-.073-.314-.661-1.618-1.867-1.366-1.262-1.183-1.058.462-3.242.999-1.333 1.398-2.146 1.273-2.494-.12-.332-.854-.244-.854-.244l-2.449.015s-.181-.025-.315.056c-.132.079-.216.262-.216.262s-.387 1.044-.903 1.932c-1.088 1.85-1.524 1.948-1.703 1.834-.413-.267-.31-1.075-.31-1.648 0-1.79.271-2.536-.529-2.731-.266-.064-.461-.107-1.141-.114-.872-.009-1.609.003-2.027.207-.278.136-.492.439-.361.456.161.021.526.098.72.362.25.341.241 1.107.241 1.107s.144 2.107-.335 2.368c-.329.176-.779-.183-1.747-1.823-.496-.858-.871-1.808-.871-1.808s-.072-.176-.202-.271c-.157-.115-.377-.151-.377-.151l-2.327.015s-.35.01-.478.162C4.004 8.93 4.11 9.248 4.11 9.248s1.82 4.259 3.881 6.404c1.889 1.97 4.035 1.84 4.035 1.84h.972z"
      fill="white"
    />
  </svg>
);

const YandexIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M14.077 21H16.5V3h-3.115c-3.352 0-5.263 1.679-5.263 4.432 0 2.414 1.205 3.736 3.356 5.16L9 21h2.567l2.699-7.821-1.86-1.242C10.78 10.791 9.94 9.83 9.94 7.566c0-1.595 1.107-2.625 3.011-2.625h1.126V21z"
      fill="white"
    />
  </svg>
);
