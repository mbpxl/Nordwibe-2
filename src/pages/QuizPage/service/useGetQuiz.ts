import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

export interface QuizQuestion {
  uuid: string;
  question: string;
  description: string;
  image_url: string;
  answers: Array<{
    uuid: string;
    answer: string;
    is_correct: boolean;
  }>;
}

export interface QuizItem {
  uuid: string;
  title: string;
  description: string;
  image_url: string;
  questions: QuizQuestion[];
}

export interface Lesson {
  uuid: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  lessons: Array<{
    uuid: string;
    title: string;
    text: string;
    image_url: string;
  }>;
  quiz: QuizItem[];
}

const fetchQuiz = async (): Promise<Lesson[]> => {
  const response = await api.get("/content/lessons");
  return response.data;
};

export const useGetQuiz = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quiz"],
    queryFn: fetchQuiz,
    staleTime: 3600000,
  });

  return { data, isLoading, isError };
};
