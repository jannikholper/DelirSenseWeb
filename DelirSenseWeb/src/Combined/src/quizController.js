

export class QuizController {
    constructor(quiz) {
        this.quizModel = {}

        let options = [];
        this.answerOptionIndex = 0;
        this.answerFeedback = "";
        this.quizModel.quizID = quiz.getAttribute("quizId");
        
        
        //init children
        for (const child of quiz.children) {
            if (child.classList.contains("quizOption")) {
                options[this.answerOptionIndex] = child;
                let answerIndex = this.answerOptionIndex;
                let quizID = this.quizModel.quizID
                child.addEventListener("click", ()=> {
                    this.selectAnswer(answerIndex, quizID)
                });
                this.answerOptionIndex++;
            }

            if(child.classList.contains("feedbackArea")) {
                this.quizModel.feedbackText = child;
            }
            if(child.classList.contains("questionArea")) {
                this.quizModel.questionText = child;
            }
            if(child.classList.contains("quizContinueButton")) {
                this.quizModel.nextQuestionButton = child;
                this.quizModel.nextQuestionButton.style.display = "none";
                child.addEventListener("click", ()=> {
                    this.getRandomQuestion(this.quizModel.quizID)
                });
            }
            if(child.classList.contains("quizShowAnswerButton")) {
                this.quizModel.showAnswerButton = child;
                child.addEventListener("click", () =>{
                    this.getAnswer(this.quizModel.quizID)
                });
            }
        }
        this.quizModel.options = options;
        this.quizModel.answeredQuestions = [];
        this.quizModel.correctAnswerIndex = 0;


        $.getJSON('data/devQuizData.json', (data) => {

            for (const quiz of data.quizzes) {
                if (quiz.quizId === this.quizModel.quizID) {
                    this.quizModel.quizData = quiz
                }
            }

            this.getRandomQuestion(this.quizModel.quizID);
        });
    }


    getRandomQuestion(quizID) {

        // let currentQuiz = quizModels.find(quiz => quiz.quizID === quizID);

        this.quizModel.feedbackText.innerHTML = "Wähle eine Antwort";
        this.quizModel.showAnswerButton.style.display = "block";
        this.quizModel.nextQuestionButton.style.display = "none";

        let currentQuestion = this.quizModel.quizData.questions[Math.floor(Math.random()*this.quizModel.quizData.questions.length)];
        this.answerFeedback = currentQuestion.answerFeedbackText;
        this.quizModel.correctAnswerIndex = currentQuestion.correctAnswerIndex;
        this.quizModel.questionText.innerHTML = currentQuestion.questionText;

        $.each(currentQuestion.answerOptions, (i, answerOption) => {
            this.quizModel.options[i].classList.remove("correctAnswer");
            this.quizModel.options[i].classList.remove("wrongAnswer");
            this.quizModel.options[i].classList.remove("selectedAnswer");

            for (const child of this.quizModel.options[i].children)
            {
                if(child.classList.contains("material-icons"))
                {
                    child.style.display = "block";
                    child.innerHTML = "";
                    child.classList.remove("correctAnswerColor");
                    child.classList.remove("wrongAnswerColor");
                }

                if(child.classList.contains("text-1"))
                {
                    child.innerHTML = answerOption;
                }
            }
        });

        this.quizModel.currentQuestion = currentQuestion;

    }

    getAnswer(quizID)
    {
        let hasAnswer = false;
        for (let i=0; i<this.quizModel.options.length; i++) {

            if(this.quizModel.options[i].classList.contains("selectedAnswer"))
            {
                hasAnswer = true
            }
        }

        if(!hasAnswer)
        {
            this.quizModel.feedbackText.innerHTML = "Du hast keine Antwort ausgewählt!";
            return;
        }

        //verarbeite antwort
        this.quizModel.feedbackText.innerHTML = this.answerFeedback;

        this.quizModel.showAnswerButton.style.display = "none";
        this.quizModel.nextQuestionButton.style.display = "block";

        for (let i=0; i<this.quizModel.options.length; i++) {

            this.quizModel.options[i].classList.remove("selectedAnswer");

            if(i === this.quizModel.correctAnswerIndex)
            {
                this.quizModel.options[i].classList.add("correctAnswer");
                for (const child of this.quizModel.options[i].children)
                {
                    if(child.classList.contains("material-icons"))
                    {
                        child.style.display = "block";
                        child.innerHTML = "check";
                        child.classList.add("correctAnswerColor");
                    }
                }
            }
            else
            {
                this.quizModel.options[i].classList.add("wrongAnswer");
                for (const child of this.quizModel.options[i].children)
                {
                    if(child.classList.contains("material-icons"))
                    {
                        child.style.display = "block";
                        child.innerHTML = "clear";
                        child.classList.add("wrongAnswerColor");
                    }
                }
            }
        }
    }

    selectAnswer(answerIndex, quizID)
    {
        // let currentQuiz =  quizModels.find(quiz => quiz.quizID === quizID);

        for (let i=0; i<this.quizModel.options.length; i++) {
            if(i === answerIndex)
            {
                this.quizModel.options[i].classList.add("selectedAnswer");
            }
            else
            {
                this.quizModel.options[i].classList.remove("selectedAnswer");
            }
        }
    }
    
}