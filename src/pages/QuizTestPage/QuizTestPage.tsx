import { useParams } from "react-router-dom";
import Error from "../../shared/Components/ErrorPage/ErrorPage";
import QuizSlideHeader from "../../shared/Components/Education/EducationsSlideHeader/EducationSlideHeader";
// import QuizImage from "../../shared/Components/Education/EducationsTypography/EducationImage";
import QuizTestList from "./components/QuizTestList/QuizTestList";
import QuizTestAction from "./components/QuizTestAction/QuizTestAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Wrapper from "../../shared/Components/Wrapper/Wrapper";
import { useGetQuiz } from "../QuizPage/service/useGetQuiz";
import Loading from "../../shared/Components/Loading/Loading";
import { usePostQuiz } from "./service/usePostQuiz";

const QuizTestPage = () => {
  const { data, isLoading } = useGetQuiz();
  const { mutate } = usePostQuiz();

  if (isLoading) {
    return <Loading />;
  }

  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  const selectedQuiz = data.find((quiz: any) => quiz.uuid === uuid);
  if (!selectedQuiz) return <Error />;

  const quizData = selectedQuiz.quiz[0];
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});

  const isAllAnswered = quizData.questions.every(
    (q: any) => userAnswers[q.uuid] && userAnswers[q.uuid].length > 0
  );

  const isAllCorrect = quizData.questions.every((q: any) => {
    const correctAnswers = q.answers
      .filter((a: any) => a.is_correct)
      .map((a: any) => a.uuid);
    const chosenAnswers = userAnswers[q.uuid] || [];
    return (
      correctAnswers.length === chosenAnswers.length &&
      correctAnswers.every((id: string) => chosenAnswers.includes(id))
    );
  });

  const handleSubmit = () => {
    if (!isAllAnswered) return;

    if (isAllCorrect) {
      const payload = quizData.questions.flatMap((q: any) =>
        (userAnswers[q.uuid] || []).map((a) => ({
          question_id: q.uuid,
          answer_id: a,
        }))
      );

      mutate(payload, {
        onSuccess: () => {
          navigate(`/quiz/${uuid}/result`, {
            state: { userAnswers, quizData, isAllCorrect },
          });
        },
      });
    } else {
      navigate(`/quiz/${uuid}/result`, {
        state: { userAnswers, quizData, isAllCorrect },
      });
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col max-w-[21.5rem] m-auto relative min-h-screen">
        <QuizSlideHeader heading={selectedQuiz.title} unit={"/quiz"} />

        <QuizTestList
          quizes={[quizData]}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />

        <QuizTestAction onSubmit={handleSubmit} disabled={!isAllAnswered} />
      </div>
    </Wrapper>
  );
};

export default QuizTestPage;
