import axios from "axios"

export const api = axios.create({
	baseURL: "https://quizonline-api.onrender.com"
})

export const getHeader = () => {
  const token = localStorage.getItem("token")
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

export const createQuestion = async(quizQustion) =>{
  try {
    const response = await api.post("/api/quizzes/create-new-question", quizQustion, {
      headers: getHeader(),
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllQuestions = async() =>{
  try {
    const response = await api.get("/api/quizzes/all-questions", {
      headers: getHeader(),
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchQuizForUser = async(number, subject) =>{
  try {
    const response = await api.get(
			`/api/quizzes/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`, {
      headers: getHeader(),
    }
		)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSubjects = async() =>{
  try {
    const response = await api.get("/api/quizzes/subjects", {
      headers: getHeader(),
    })
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const updateQuestion = async(id, question) =>{
  try {
    const response = await api.put(`/api/quizzes/question/${id}/update`, question, {
      headers: getHeader(),
    })
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const getQuestionById = async(id) =>{
  try {
    const response = await api.get(`/api/quizzes/question/${id}`, {
      headers: getHeader(),
    })
		return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteQuestion = async(id) =>{
  try {
    const response = await api.delete(`/api/quizzes/question/${id}/delete`, {
      headers: getHeader(),
    })
		return response.data
  } catch (error) {
    console.error(error)
  }
}

/* This function register a new user */
export async function registerUser(registration) {
  try {
    const response = await api.post("/auth/register-user", registration)
    return response.data
  } catch (error) {
    if (error.reeponse && error.response.data) {
      throw new Error(error.response.data)
    } else {
      throw new Error(`User registration error : ${error.message}`)
    }
  }
}

/* This function login a registered user */
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
  try {
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader(),
    })
    return response.data
  } catch (error) {
    throw error
  }
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    })
    return response.data
  } catch (error) {
    return error.message
  }
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader(),
    })
    return response.data
  } catch (error) {
    throw error
  }
}