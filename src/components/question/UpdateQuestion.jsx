import React, { useEffect, useState } from "react"

import { Link, useNavigate, useParams } from "react-router-dom"
import { getQuestionById, updateQuestion } from "../../../utils/QuizService"

const UpdateQuestion = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [question, setQuestion] = useState("")
	const [choices, setChoices] = useState([""])
	const [correctAnswers, setCorrectAnswers] = useState("")
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchQuestion()
	}, [])

	const fetchQuestion = async () => {
		try {
			const questionToUpdate = await getQuestionById(id)
			if (questionToUpdate) {
				setQuestion(questionToUpdate.question)
				setChoices(questionToUpdate.choices)
				if (questionToUpdate.correctAnswers.length == 1) {setCorrectAnswers([questionToUpdate.correctAnswers])}
				else {setCorrectAnswers(questionToUpdate.correctAnswers)}
			}
			setIsLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const handleQuestionChange = (e) => {
		setQuestion(e.target.value)
	}

	const handleChoiceChange = (index, e) => {
		const updatedChoices = [...choices]
		updatedChoices[index] = e.target.value
		setChoices(updatedChoices)
	}

	const handleCorrectAnswerChange = (index, e) => {
		const updatedcorrectAnswers = [...correctAnswers]
		updatedcorrectAnswers[index] = e.target.value
		setCorrectAnswers(updatedcorrectAnswers)
	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		try {
			const missingAnswers = correctAnswers.filter(ans => !choices.includes(ans));
			if (missingAnswers && missingAnswers.length > 0) { alert(`Invalid correct answers: ${missingAnswers.join(", ")} not in choices`); return; }

			const updatedQuestion = {
				question,
				choices,
				correctAnswers: correctAnswers
			}
			if (!validateInputs(updatedQuestion)) { alert("Please Enter All Required Details."); return; }
			await updateQuestion(id, updatedQuestion)
			alert("Question Updated Successfully.");
			navigate("/all-quizzes")
		} catch (error) {
			alert("Problem in Question Updation.");
			console.error(error)
		}
	}

	const validateInputs = (result) => {
		if(result.question == "" || result.choices.length <= 0 || result.choices[0] == "" || result.correctAnswers.length <= 0 ||  result.correctAnswers[0] == "" ){return false;}
		return true
	}

	if (isLoading) {
		return <p>Loading...</p>
	}

	return (
		<div className="container">
			<h4 className="mt-5" style={{ color: "GrayText" }}>
				Update Quiz Question
			</h4>
			<div className="col-8">
				<form onSubmit={handleUpdate}>
					<div className="form-group">
						<label className="text-info">Question:</label>
						<textarea
							className="form-control"
							rows={4}
							value={question}
							onChange={handleQuestionChange}></textarea>
					</div>

					<div className="form-group">
						<label className="text-info">Choices:</label>
						{choices.map((choice, index) => (
							<input
								key={index}
								type="text"
								className="form-control mb-4"
								value={choice}
								onChange={(e) => handleChoiceChange(index, e)}
							/>
						))}
					</div>
					<div className="form-group">
						<label className="text-info">Correct Answer(s):</label>
						{correctAnswers.map((correctAnswer, index) => (
							<input
								key={index}
								type="text"
								className="form-control mb-4"
								value={correctAnswer}
								onChange={(e) => handleCorrectAnswerChange(index, e)}
							/>
						))}
					</div>

					<div className="btn-group">
						<button type="submit" className="btn btn-sm btn-outline-warning">
							Update question
						</button>
						<Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
							Back to all questions
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdateQuestion
