import { useCallback } from "react";

const useFormatUnformatCode = () => {
  const formatCode = useCallback((input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 4);
    return digits.split("").join("-");
  }, []);

  const unformatCode = useCallback((formatted: string) => {
    return formatted.replace(/\D/g, "").slice(0, 4);
  }, []);

  return { formatCode, unformatCode };
};

export default useFormatUnformatCode;
