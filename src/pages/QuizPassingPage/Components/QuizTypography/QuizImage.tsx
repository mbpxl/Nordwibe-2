const QuizImage: React.FC<{image_url: string}> = ({image_url}) => {
	return (
		<img
      src={image_url}
    	alt={`Quiz Image`}
      className="self-center mb-3"
    />
	)
}

export default QuizImage