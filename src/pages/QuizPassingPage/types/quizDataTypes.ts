export type QuizessTypes = Array<{
	uuid: string;
	title: string;
	description: string;
	image_url: string;
	isCompleted: boolean;
	time: string;
	lessons: LessonsType[];
	quiz: QuizTypes[];
}>;

export type QuizCardType = {
	uuid: string;
	title: string;
	description: string;
	image_url: string;
	time: string;
}

export type LessonsType = {
	uuid: string;
	title: string;
	text: string;
	image_url: string;
};

export type QuizTypes = {
	uuid: string;
	title: string;
	description: string;
	image_url: string;
	questions: QuestionsType[];
};

export type QuestionsType = {
	uuid: string;
	question: string;
	description: string;
	image_url: string;
	answers: AnswersType[];
};

export type AnswersType = {
	uuid: string;
	answer: string;
	is_correct: boolean;
};