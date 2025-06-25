// components/AnimatedStepWrapper.tsx
import { motion, AnimatePresence } from "framer-motion";

const getVariants = (direction: "forward" | "backward") => ({
  initial: {
    opacity: 0,
    x: direction === "forward" ? 100 : -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: direction === "forward" ? -100 : 100,
  },
});

interface AnimatedStepWrapperProps {
  stepKey: number;
  direction: "forward" | "backward";
  children: React.ReactNode;
}

const AnimatedStepWrapper: React.FC<AnimatedStepWrapperProps> = ({
  stepKey,
  direction,
  children,
}) => {
  const variants = getVariants(direction);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={stepKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedStepWrapper;
