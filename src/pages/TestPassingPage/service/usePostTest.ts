import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

interface TestAnswerRequest {
  question_id: string;
  answer_id: string;
}

const postTest = async (answers: TestAnswerRequest[]) => {
  const { data } = await api.post("/ranking/test", answers);
  return data;
};

export const usePostTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completedTests"] });
    },
  });
};
