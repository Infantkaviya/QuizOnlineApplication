import React from "react"
import { useNavigate } from "react-router-dom"
import { useLocation} from "react-router-dom"

 const QuizResult = () => {
		const location = useLocation()
		const navigate = useNavigate()
		const { quizQuestions, totalScores } = location.state
		const numQuestions = quizQuestions.length
		const percentage = Math.round((totalScores / numQuestions) * 100)

		return (
			<section className="container mt-5">
				<h3>Your Quiz Result Summary</h3>
				<hr />
				<h5 className="text-info">
					You answered {totalScores} out of {numQuestions} questions correctly.
				</h5>
				<p>Your total score is {percentage}%.</p>

				<button className="btn btn-primary btn-sm" onClick={() => navigate("/quiz-stepper")}>
					Retake this quiz
				</button>
			</section>
		)
 }

 export default QuizResult