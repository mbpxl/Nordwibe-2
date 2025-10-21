import { useLocation } from "react-router-dom";
import QuizSlideHeader from "../../shared/Components/Education/EducationsSlideHeader/EducationSlideHeader";
import Wrapper from "../../shared/Components/Wrapper/Wrapper";

const QuizResultPage = () => {
  const { state } = useLocation();
  const { userAnswers, quizData, isAllCorrect } = state;

  const totalQuestions = quizData.questions.length;
  let correctCount = 0;

  quizData.questions.forEach((q: any) => {
    const selected = userAnswers[q.uuid] || [];
    const correctAnswers = q.answers
      .filter((a: any) => a.is_correct)
      .map((a: any) => a.uuid);

    const isCorrect =
      selected.length === correctAnswers.length &&
      selected.every((ansId: string) => correctAnswers.includes(ansId));

    if (isCorrect) correctCount++;
  });

  let resultMessage = "";
  const percent = (correctCount / totalQuestions) * 100;

  if (percent === 100) {
    resultMessage =
      "У вас отличный результат! Вы прекрасно ориентируетесь в теме и уверенно отвечаете на все вопросы. Это значит, что вы умеете находить ключевые моменты, грамотно анализировать информацию и применять знания на практике. Такой уровень подготовки поможет вам принимать правильные решения и избегать ошибок. Продолжайте в том же духе — у вас всё получится!";
  } else if (percent >= 60) {
    resultMessage =
      "Хороший результат! Вы уверенно справились с большей частью вопросов и продемонстрировали хорошие знания. Да, есть несколько моментов, которые стоит повторить, но в целом вы уже понимаете суть и знаете, как действовать в большинстве ситуаций. Немного практики и внимания к деталям — и вы сможете выйти на уровень эксперта.";
  } else {
    resultMessage =
      "Нужно повторить материал! Вам удалось правильно ответить лишь на часть вопросов. Это значит, что материал ещё не усвоен полностью, и есть риск упустить важные нюансы. Не расстраивайтесь: тест показал, над чем стоит поработать. Вернитесь к урокам, повторите ключевые моменты — и следующий результат будет гораздо лучше!";
  }

  return (
    <Wrapper>
      <div className="flex flex-col max-w-[21.5rem] m-auto relative min-h-screen pb-32">
        <QuizSlideHeader heading={"Результаты"} unit={"/quiz"} />

        <p className="mt-2 text-[1rem] font-medium leading-[1.25rem]">
          {resultMessage}
        </p>

        <h2 className="mt-6 font-semibold">Подробные результаты</h2>
        {!isAllCorrect && (
          <h3 className="mt-5 p-3 text-[1.08rem] border-2 border-purple-main rounded-2xl">
            Для прохождения квиза необходимо правильно ответить на все вопросы!
          </h3>
        )}

        <div className="mt-4 flex flex-col gap-6">
          {quizData.questions.map((question: any) => (
            <div key={question.uuid}>
              <h3 className="font-medium mb-3">{question.question}</h3>
              {question.answers.map((ans: any) => {
                const isSelected = userAnswers[question.uuid]?.includes(
                  ans.uuid
                );
                const isCorrect = ans.is_correct;

                return (
                  <div
                    key={ans.uuid}
                    className={`flex items-center gap-2 p-1 rounded ${
                      isSelected && !isCorrect ? "bg-red-200" : ""
                    }`}
                  >
                    <input type="checkbox" checked={isSelected} disabled />
                    <span className="text-black-heading font-medium">
                      {ans.answer}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default QuizResultPage;
