import React from "react";

interface HeaderProps {
  children: React.ReactNode;
}

const TopicHeader: React.FC<HeaderProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  let left: React.ReactNode = null;
  let center: React.ReactNode = null;
  let right: React.ReactNode = null;

  if (childrenArray.length === 1) {
    center = childrenArray[0];
  } else if (childrenArray.length === 2) {
    if (
      React.isValidElement(childrenArray[0]) &&
      childrenArray[0].type === "h1"
    ) {
      center = childrenArray[0];
      right = childrenArray[1];
    } else if (
      React.isValidElement(childrenArray[1]) &&
      childrenArray[1].type === "h1"
    ) {
      left = childrenArray[0];
      center = childrenArray[1];
    }
  } else if (childrenArray.length === 3) {
    left = childrenArray[0];
    center = childrenArray[1];
    right = childrenArray[2];
  }

  return (
    <div className="border-[#d9d9d9] px-3.5 py-3 mb-3">
      <div className="grid grid-cols-3 items-center text-[1.25rem] leading-6 font-semibold relative">
        {/* Левый слот */}
        <div className="flex justify-start">{left}</div>

        {/* Центрированный заголовок */}
        <div className="flex justify-center text-black-heading text-nowrap">
          {center}
        </div>

        {/* Правый слот */}
        <div className="flex justify-end">{right}</div>
      </div>
    </div>
  );
};

export default TopicHeader;
