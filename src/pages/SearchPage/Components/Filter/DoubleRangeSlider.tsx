// Components/DoubleRangeSlider/DoubleRangeSlider.tsx
import React, { useState, useEffect } from "react";

interface DoubleRangeSliderProps {
  min: number;
  max: number;
  values: { min: number; max: number };
  onChange: (values: { min: number; max: number }) => void;
}

const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = ({
  min,
  max,
  values,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(values.min);
  const [maxValue, setMaxValue] = useState(values.max);

  useEffect(() => {
    setMinValue(values.min);
    setMaxValue(values.max);
  }, [values]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    onChange({ min: value, max: maxValue });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    onChange({ min: minValue, max: value });
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="py-4">
      <div className="relative h-2 bg-gray-200 rounded">
        <div
          className="absolute h-2 bg-purple-main rounded"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
        />
        <div
          className="absolute w-4 h-4 bg-purple-main rounded-full -top-1 transform -translate-x-1/2 z-10"
          style={{ left: `${minPercent}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-purple-main rounded-full -top-1 transform -translate-x-1/2 z-10"
          style={{ left: `${maxPercent}%` }}
        />
      </div>
      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <span>От: {minValue}</span>
        <span>До: {maxValue}</span>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
