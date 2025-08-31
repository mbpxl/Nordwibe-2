import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

type QuizAnswerPayload = {
  question_id: string;
  answer_id: string;
};

const postQuiz = async (payload: QuizAnswerPayload) => {
  const response = await api.post("/ranking/quiz", payload);
  return response.data;
};

export const usePostQuiz = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: postQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queryClient"] });
    },
  });

  return { mutate, isError, isPending };
};
