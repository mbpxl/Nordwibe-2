import { useState } from "react";
import QuizSlideHeader from "../QuizSlideHeader/quizSlideHeader";
import QuizProgress from "../QuizProgress/QuizProgress";
import Wrapper from "../../../../shared/Components/Wrapper/Wrapper";
import { mockQuizzes } from "../../misc/quizData";
import QuizParagraphs from "../QuizTypography/QuizParagraph";
import QuizTitle from "../QuizTypography/QuizTitle";
import QuizImage from "../QuizTypography/QuizImage";
import { useParams } from "react-router-dom";
import Error from "../../../../shared/Components/ErrorPage/ErrorPage";

const QuizSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
	const { uuid } = useParams<{ uuid: string }>();
	const selectedQuiz = mockQuizzes.find((quiz) => quiz.uuid === uuid);
	if(!selectedQuiz) {
		return <Error/>
	}

  const lessons = selectedQuiz.lessons;

  const slide = lessons[currentSlide];

  return (
    <Wrapper className="min-h-screen flex flex-col justify-between pb-[30px]">
      <div className="h-[320px]">
        <div className="flex flex-col">
          <QuizSlideHeader heading={selectedQuiz.title} />

          <QuizImage image_url={slide.image_url}/>
					<QuizTitle title={slide.title}/>
					<QuizParagraphs paragraphs={slide.text.split(". ").map(i=>i.replace(/\.*$/,"."))}/>
					
        </div>
      </div>

      <QuizProgress
				currentSlide={currentSlide}
				setCurrentSlide={setCurrentSlide}
				quizData={lessons}
				uuid={uuid!}
			/>
    </Wrapper>
  );
};

export default QuizSlide;
