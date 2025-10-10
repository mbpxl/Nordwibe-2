export const setCompatibilityStyle = (compatibility: number) => {
  if (compatibility > 80) {
    return "bg-[#06B500]";
  } else if (compatibility <= 80 && compatibility > 50) {
    return "bg-[#81AF00]";
  } else if (compatibility <= 50 && compatibility > 15) {
    return "bg-[#D79E00]";
  } else {
    return "bg-[#FF2727]";
  }
};
