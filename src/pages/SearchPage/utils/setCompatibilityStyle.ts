export const setCompatibilityStyle = (
  compatibility: number,
  isBlocked = false
) => {
  if (isBlocked) {
    return "bg-gray-400";
  } else if (compatibility > 80) {
    return "bg-[#06B500]";
  } else if (compatibility <= 80 && compatibility > 50) {
    return "bg-[#81AF00]";
  } else if (compatibility <= 50 && compatibility > 15) {
    return "bg-[#D79E00]";
  } else {
    return "bg-[#FF2727]";
  }
};
