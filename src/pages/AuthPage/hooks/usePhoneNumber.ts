export const usePhoneFormatter = () => {
  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const parts = [];

    if (digits.length > 0) parts.push("(" + digits.slice(0, 3));
    if (digits.length >= 3) parts[0] += ")";
    if (digits.length > 3) parts.push(" " + digits.slice(3, 6));
    if (digits.length > 6) parts.push("-" + digits.slice(6, 8));
    if (digits.length > 8) parts.push("-" + digits.slice(8, 10));

    return parts.join("");
  };

  return { formatPhone };
};
