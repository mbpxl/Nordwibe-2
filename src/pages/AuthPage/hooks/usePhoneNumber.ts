import { useCallback, type RefObject } from "react";

export const usePhoneFormatter = () => {
  const formatPhone = useCallback((value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const parts: string[] = [];

    if (digits.length > 0) parts.push("(" + digits.slice(0, 3));
    if (digits.length >= 3) parts[0] += ")";
    if (digits.length > 3) parts.push(" " + digits.slice(3, 6));
    if (digits.length > 6) parts.push("-" + digits.slice(6, 8));
    if (digits.length > 8) parts.push("-" + digits.slice(8, 10));

    return parts.join("");
  }, []);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setPhone: (val: string) => void,
      inputRef?: RefObject<HTMLInputElement | null>
    ) => {
      const input = e.target.value;
      const digits = input.replace(/\D/g, "");
      const clean = digits.startsWith("7") ? digits.slice(1) : digits;
      const limited = clean.slice(0, 10);
      setPhone(limited);

      if (limited.length === 10) {
        inputRef?.current?.blur();
      }
    },
    []
  );

  return { formatPhone, handleInputChange };
};
