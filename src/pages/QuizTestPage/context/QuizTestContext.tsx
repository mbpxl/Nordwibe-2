import React, { createContext, useContext, useMemo, useState } from "react";

type Selections = Record<string, Set<string>>;

type QuizTestContextType = {
  selections: Selections;
  isSelected: (questionId: string, answerId: string) => boolean;
  toggle: (questionId: string, answerId: string) => void;
  setMany: (s: Selections) => void;
  reset: () => void;
};

const QuizTestContext = createContext<QuizTestContextType | null>(null);

export const QuizTestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selections, setSelections] = useState<Selections>({});

  const isSelected = (qId: string, aId: string) =>
    selections[qId]?.has(aId) ?? false;

  const toggle = (qId: string, aId: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      const set = new Set(next[qId] ?? []);
      if (set.has(aId)) set.delete(aId);
      else set.add(aId);
      next[qId] = set;
      return next;
    });
  };

  const setMany = (s: Selections) => setSelections(s);
  const reset = () => setSelections({});

  const value = useMemo(
    () => ({ selections, isSelected, toggle, setMany, reset }),
    [selections]
  );

  return (
    <QuizTestContext.Provider value={value}>
      {children}
    </QuizTestContext.Provider>
  );
};

export const useQuizTest = () => {
  const ctx = useContext(QuizTestContext);
  if (!ctx) throw new Error("useQuizTest must be used within QuizTestProvider");
  return ctx;
};
