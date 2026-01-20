// Components/DoubleRangeSlider/DoubleRangeSlider.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";

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
  const [minInputValue, setMinInputValue] = useState(String(values.min));
  const [maxInputValue, setMaxInputValue] = useState(String(values.max));
  const [isMinFocused, setIsMinFocused] = useState(false);
  const [isMaxFocused, setIsMaxFocused] = useState(false);

  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Синхронизация с внешними значениями только когда поля не в фокусе
  useEffect(() => {
    if (!isMinFocused) {
      setMinValue(values.min);
      setMinInputValue(String(values.min));
    }
    if (!isMaxFocused) {
      setMaxValue(values.max);
      setMaxInputValue(String(values.max));
    }
  }, [values.min, values.max, isMinFocused, isMaxFocused]);

  // Функция для обновления позиций элементов
  const updatePositions = useCallback(() => {
    if (!rangeRef.current) return;

    const minPercent = ((minValue - min) / (max - min)) * 100;
    const maxPercent = ((maxValue - min) / (max - min)) * 100;

    // Обновляем прогресс-бар
    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.right = `${100 - maxPercent}%`;
    }

    // Обновляем позиции визуальных ползунков
    if (minThumbRef.current) {
      minThumbRef.current.style.left = `${minPercent}%`;
    }

    if (maxThumbRef.current) {
      maxThumbRef.current.style.left = `${maxPercent}%`;
    }
  }, [minValue, maxValue, min, max]);

  useEffect(() => {
    updatePositions();
  }, [minValue, maxValue, updatePositions]);

  // Функция валидации и обновления минимального значения
  const updateMinValue = useCallback(
    (newMin: number) => {
      const validatedMin = Math.max(min, Math.min(newMin, maxValue - 1));
      const validatedMax = maxValue;

      // Проверяем, что значения изменились
      if (validatedMin !== minValue || validatedMax !== maxValue) {
        setMinValue(validatedMin);
        setMinInputValue(String(validatedMin));

        // Если минимальное значение слишком близко к максимальному, двигаем и максимальное
        if (validatedMax - validatedMin < 1) {
          const newMax = Math.min(max, validatedMin + 1);
          setMaxValue(newMax);
          setMaxInputValue(String(newMax));
          onChange({ min: validatedMin, max: newMax });
        } else {
          onChange({ min: validatedMin, max: validatedMax });
        }
      }
    },
    [min, max, minValue, maxValue, onChange],
  );

  // Функция валидации и обновления максимального значения
  const updateMaxValue = useCallback(
    (newMax: number) => {
      const validatedMax = Math.min(max, Math.max(newMax, minValue + 1));
      const validatedMin = minValue;

      // Проверяем, что значения изменились
      if (validatedMin !== minValue || validatedMax !== maxValue) {
        setMaxValue(validatedMax);
        setMaxInputValue(String(validatedMax));

        // Если максимальное значение слишком близко к минимальному, двигаем и минимальное
        if (validatedMax - validatedMin < 1) {
          const newMin = Math.max(min, validatedMax - 1);
          setMinValue(newMin);
          setMinInputValue(String(newMin));
          onChange({ min: newMin, max: validatedMax });
        } else {
          onChange({ min: validatedMin, max: validatedMax });
        }
      }
    },
    [min, max, minValue, maxValue, onChange],
  );

  // Обработчики для полей ввода с клавиатуры
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinInputValue(value);

    // Разрешаем пустую строку для удобства ввода
    if (value === "") {
      return;
    }

    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    updateMinValue(numValue);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxInputValue(value);

    if (value === "") {
      return;
    }

    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    updateMaxValue(numValue);
  };

  // Обработчики для потери фокуса
  const handleMinInputBlur = () => {
    setIsMinFocused(false);

    if (minInputValue === "") {
      // Если поле пустое, восстанавливаем предыдущее значение
      setMinInputValue(String(minValue));
    } else {
      const numValue = parseInt(minInputValue, 10);
      if (isNaN(numValue)) {
        setMinInputValue(String(minValue));
      } else {
        updateMinValue(numValue);
      }
    }
  };

  const handleMaxInputBlur = () => {
    setIsMaxFocused(false);

    if (maxInputValue === "") {
      setMaxInputValue(String(maxValue));
    } else {
      const numValue = parseInt(maxInputValue, 10);
      if (isNaN(numValue)) {
        setMaxInputValue(String(maxValue));
      } else {
        updateMaxValue(numValue);
      }
    }
  };

  // Обработчики для фокуса
  const handleMinInputFocus = () => {
    setIsMinFocused(true);
  };

  const handleMaxInputFocus = () => {
    setIsMaxFocused(true);
  };

  // Обработчики для нажатия Enter
  const handleMinInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMinInputBlur();
      minInputRef.current?.blur();
    }
  };

  const handleMaxInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMaxInputBlur();
      maxInputRef.current?.blur();
    }
  };

  // Обработчики для слайдеров
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateMaxValue(value);
  };

  // Функция для клика по области слайдера
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderContainerRef.current) return;

    const rect = sliderContainerRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    const newValue = min + Math.round((percentage / 100) * (max - min));

    // Определяем, какой ползунок ближе к клику
    const minDistance = Math.abs(minValue - newValue);
    const maxDistance = Math.abs(maxValue - newValue);

    if (minDistance <= maxDistance) {
      // Клик ближе к минимальному ползунку
      if (newValue < maxValue) {
        updateMinValue(newValue);
      }
    } else {
      // Клик ближе к максимальному ползунку
      if (newValue > minValue) {
        updateMaxValue(newValue);
      }
    }
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="py-4">
      {/* Поля числового ввода */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">От:</span>
          <input
            ref={minInputRef}
            type="number"
            min={min}
            max={max}
            value={minInputValue}
            onChange={handleMinInputChange}
            onFocus={handleMinInputFocus}
            onBlur={handleMinInputBlur}
            onKeyDown={handleMinInputKeyDown}
            className="w-20 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-main focus:ring-2 focus:ring-purple-200 transition-all"
            aria-label="Минимальный возраст"
          />
        </div>
        <div className="text-gray-400">—</div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">До:</span>
          <input
            ref={maxInputRef}
            type="number"
            min={min}
            max={max}
            value={maxInputValue}
            onChange={handleMaxInputChange}
            onFocus={handleMaxInputFocus}
            onBlur={handleMaxInputBlur}
            onKeyDown={handleMaxInputKeyDown}
            className="w-20 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-main focus:ring-2 focus:ring-purple-200 transition-all"
            aria-label="Максимальный возраст"
          />
        </div>
      </div>

      {/* Слайдер */}
      <div
        ref={sliderContainerRef}
        className="relative h-2 bg-gray-200 rounded cursor-pointer"
        onClick={handleSliderClick}
      >
        {/* Фон прогресс-бара */}
        <div className="absolute inset-0 bg-gray-200 rounded"></div>

        {/* Активная часть прогресс-бара */}
        <div
          ref={rangeRef}
          className="absolute h-2 bg-purple-main rounded"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Визуальные ползунки с увеличенной областью касания */}
        <div
          ref={minThumbRef}
          className="absolute w-8 h-8 -top-3 transform -translate-x-1/2 z-20 cursor-grab active:cursor-grabbing group"
          style={{ left: `${minPercent}%` }}
        >
          {/* Увеличенная невидимая область для лучшего касания */}
          <div className="absolute inset-0 -m-2"></div>
          {/* Визуальная часть ползунка */}
          <div className="absolute w-5 h-5 bg-purple-main rounded-full shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-active:scale-110 transition-transform"></div>
        </div>

        <div
          ref={maxThumbRef}
          className="absolute w-8 h-8 -top-3 transform -translate-x-1/2 z-20 cursor-grab active:cursor-grabbing group"
          style={{ left: `${maxPercent}%` }}
        >
          {/* Увеличенная невидимая область для лучшего касания */}
          <div className="absolute inset-0 -m-2"></div>
          {/* Визуальная часть ползунка */}
          <div className="absolute w-5 h-5 bg-purple-main rounded-full shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-active:scale-110 transition-transform"></div>
        </div>

        {/* Input для минимального значения */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-4 opacity-0 cursor-pointer z-30"
          style={{
            top: "-6px",
            zIndex: minValue > max - 100 ? 40 : 30,
          }}
          aria-label="Минимальный возраст (слайдер)"
        />

        {/* Input для максимального значения */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-4 opacity-0 cursor-pointer z-30"
          style={{
            top: "-6px",
            zIndex: maxValue < min + 100 ? 40 : 30,
          }}
          aria-label="Максимальный возраст (слайдер)"
        />
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
