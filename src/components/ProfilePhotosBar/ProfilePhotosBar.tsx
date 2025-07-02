import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const initialPhotos = [
  "/imgs/profile.png",
  "/imgs/profile.png",
  "/imgs/profile.png",
];

const ProfilePhotosBar = () => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [mainIndex, setMainIndex] = useState(0);

  const handleSwap = (draggedIndex: number) => {
    if (draggedIndex === mainIndex) return;
    const newPhotos = [...photos];
    [newPhotos[mainIndex], newPhotos[draggedIndex]] = [
      newPhotos[draggedIndex],
      newPhotos[mainIndex],
    ];
    setPhotos(newPhotos);
    setMainIndex(draggedIndex);
  };

  return (
    <div className="flex justify-center items-center h-screen gap-4 overflow-hidden">
      {photos.map((photo, index) => {
        const isMain = index === mainIndex;
        const isLeft = index < mainIndex;
        const isRight = index > mainIndex;

        return (
          <motion.div
            key={index}
            className={clsx(
              "rounded-xl overflow-hidden cursor-pointer shadow-lg",
              isMain
                ? "z-20 w-48 h-48"
                : "z-10 w-32 h-32 brightness-50 scale-90"
            )}
            drag={!isMain}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (Math.abs(info.point.x) > 50) {
                handleSwap(index);
              }
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              x: isMain ? 0 : isLeft ? -80 : 80,
              scale: isMain ? 1 : 0.9,
              opacity: isMain ? 1 : 0.6,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProfilePhotosBar;
