import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  return (
    <main className="container mt-5">
      <h2>Welcome to the Online Quiz App!</h2>

      <p className="lead mt-5">
        Test your knowledge with various quizzes, track your progress, 
		<br></br>and
        challenge yourself to improve. Get started now!
      </p>

      <div>
        <button className="btn btn-primary mt-4" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </main>
  );
};

export default Home;
