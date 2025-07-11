import { useState, useRef, useCallback } from "react";

const useFormatBirthDate = (initialValue = "") => {
  const [date, setDate] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatDate = useCallback((rawValue: string): string => {
    const digits = rawValue.replace(/\D/g, "").slice(0, 8);
    
    if (digits.length >= 5) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    }
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatDate(e.target.value);
    setDate(formattedValue);

    if (formattedValue.length === 10) {
      inputRef.current?.blur();
    }
  }, [formatDate]);

  const validateDate = useCallback(() => {
    if (date.length !== 10) return false;
    
    const day = Number(date.slice(0, 2));
    const month = Number(date.slice(3, 5));
    const year = Number(date.slice(6));
    const currentYear = new Date().getFullYear();

    return (
      day <= 31 &&
      month <= 12 &&
      year <= currentYear - 18 &&
      year >= 1910
    );
  }, [date]);

  return {
    date,
    inputRef,
    isDateValid: validateDate(),
    handleChange,
    setDate
  };
};

export default useFormatBirthDate;