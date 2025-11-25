import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  quality?: number; // 1-100
  priority?: boolean; // Для above-the-fold изображений
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  lazy = true,
  quality = 80,
  priority = false,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  // Оптимизированный URL с параметрами
  const getOptimizedSrc = useCallback(() => {
    if (!src) return "";

    try {
      const url = new URL(src, window.location.origin);

      // Добавляем параметры оптимизации (если бэкенд поддерживает)
      url.searchParams.set("quality", quality.toString());
      if (width) url.searchParams.set("width", width.toString());
      if (height) url.searchParams.set("height", height.toString());
      url.searchParams.set("format", "auto"); // Автовыбор лучшего формата

      return url.toString();
    } catch {
      // Если URL некорректен, возвращаем оригинальный src
      return src;
    }
  }, [src, quality, width, height]);

  const optimizedSrc = getOptimizedSrc();

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (priority || !lazy) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Начинаем загружать заранее
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, priority]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Preload критически важных изображений
  useEffect(() => {
    if (priority && optimizedSrc) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = optimizedSrc;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, optimizedSrc]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
      }}
      ref={imgRef}
    >
      {/* Skeleton loader */}
      <AnimatePresence>
        {isLoading && !hasError && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundSize: "200% 100%",
              animation: "loading 1.5s infinite",
            }}
          />
        )}
      </AnimatePresence>

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400">
            <img
              src="/icons/image-error.svg"
              alt="Ошибка загрузки"
              className="w-8 h-8 mx-auto mb-2"
            />
            <span className="text-xs">Не удалось загрузить</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <motion.img
          src={optimizedSrc}
          alt={alt}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
