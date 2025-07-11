import { useCallback, type RefObject } from "react";

const useFormatUnformatCode = () => {
  const formatCode = useCallback((input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 4);
    return digits.split("").join("-");
  }, []);

  const unformatCode = useCallback((formatted: string) => {
    return formatted.replace(/\D/g, "").slice(0, 4);
  }, []);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setCode: (val: string) => void,
      inputRef?: RefObject<HTMLInputElement | null>
    ) => {
      const raw = e.target.value;
      const cleaned = formattedToRaw(raw);
      setCode(cleaned);

      if (cleaned.length === 4) {
        inputRef?.current?.blur(); // скрытие клавиатуры
      }
    },
    []
  );

  const formattedToRaw = unformatCode;

  return { formatCode, unformatCode, handleChange };
};

export default useFormatUnformatCode;
