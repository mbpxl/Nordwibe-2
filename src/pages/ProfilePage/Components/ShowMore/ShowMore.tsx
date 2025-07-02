import { useState, useRef, useLayoutEffect } from "react";
import arrow from "/icons/arrow-left.svg";

interface ShowMoreProps {
  children: React.ReactNode;
  maxHeight?: number;
  backgroundColor?: string;
}

const ShowMore: React.FC<ShowMoreProps> = ({
  children,
  maxHeight = 72,
  backgroundColor = "#ffffff",
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setIsOverflowing(el.scrollHeight > maxHeight + 10);
  }, [children, maxHeight]);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={`transition-all duration-300 ease-in-out overflow-hidden pr-6`}
        style={{
          maxHeight: isOpened ? "1000px" : `${maxHeight}px`,
          WebkitMaskImage:
            !isOpened && isOverflowing
              ? `linear-gradient(180deg, black 60%, transparent 100%)`
              : "none",
          maskImage:
            !isOpened && isOverflowing
              ? `linear-gradient(180deg, black 60%, transparent 100%)`
              : "none",
        }}
      >
        {children}
      </div>

      {/* Кнопка */}
      {isOverflowing && (
        <>
          {!isOpened && (
            <div
              className="absolute bottom-0 right-0 pl-2"
              style={{ backgroundColor }}
            >
              <button
                onClick={() => setIsOpened(true)}
                className="transition-transform duration-300"
              >
                <img
                  src={arrow}
                  alt="expand"
                  className="w-4 h-4 transform -rotate-90"
                />
              </button>
            </div>
          )}
          {isOpened && (
            <div className="flex justify-end mt-1">
              <button
                onClick={() => setIsOpened(false)}
                className="transition-transform duration-300"
              >
                <img
                  src={arrow}
                  alt="collapse"
                  className="w-4 h-4 transform rotate-90"
                />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowMore;
