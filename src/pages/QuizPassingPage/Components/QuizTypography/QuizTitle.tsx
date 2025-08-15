const QuizTitle: React.FC<{title: string}> = ({title}) => {
	return (
		<h2 className="text-black-heading text-[1rem] font-semibold leading-5">
      {title}
    </h2>
	)
}

export default QuizTitle