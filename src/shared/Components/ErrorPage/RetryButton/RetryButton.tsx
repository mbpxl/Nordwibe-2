const RetryButton = () => {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <button
      onClick={refreshPage}
      className="bg-purple-main py-2 px-10 text-white text-[1.25rem] font-semibold leading-6 rounded-[30px]"
    >
      Повторить попытку
    </button>
  );
};

export default RetryButton;
