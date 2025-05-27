import { Link } from "react-router-dom";
import { SIGN_UP_ROUTE } from "../../utils/consts";

const Welcome = () => {
  return (
    <main className="px-2">
      <div className="pt-[3.8rem] flex flex-col items-center justify-center text-center h-screen overflow-scroll">
        <section className="">
          <h1 className="text-[2rem] font-semibold leading-[2.5rem] text-[#1A1A1A] mb-[1.75rem]">
            Nordwibe
          </h1>
          <h2 className="font-medium text-[1.25rem] leading-[1.5rem] text-[#1A1A1A] mb-[1.75rem]">
            Мы больше, чем соседи
          </h2>
          <h3 className="w-[18.2rem] font-medium text-[1rem] leading-[1.25rem] text-[#3D3D3D]">
            Nordwibe - это крепкая дружба, любовь и семья под одной крышей
          </h3>
        </section>
        <section className="w-[18rem] flex flex-col gap-[1rem] mt-[40vh] font-bold text-[1.125rem] leading-[1.25rem] text-white">
          <Link
            to={SIGN_UP_ROUTE}
            className="px-[1.25rem] py-[0.75rem] bg-[#3D3D3D] rounded-[30px]"
          >
            Зарегестрироваться
          </Link>
          <button className="px-[1.25rem] py-[0.75rem] bg-[#3D3D3D] rounded-[30px]">
            Войти
          </button>
        </section>
      </div>
    </main>
  );
};

export default Welcome;
