import { useCallback } from "react";

export function useBackspacePhoneFix(
  inputRef: React.RefObject<HTMLInputElement | null>,
  phone: string,
  formatPhone: (value: string) => string
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (!input) return;

      const { selectionStart } = input;
      const formatted = formatPhone(phone);

      if (e.key === "Backspace" && selectionStart && selectionStart > 0) {
        const prevChar = formatted[selectionStart - 1];
        if (["(", ")", " ", "-"].includes(prevChar)) {
          e.preventDefault();
          const newPos = selectionStart - 1;
          input.setSelectionRange(newPos, newPos);
        }
      }
    },
    [inputRef, phone, formatPhone]
  );

  return handleKeyDown;
}
