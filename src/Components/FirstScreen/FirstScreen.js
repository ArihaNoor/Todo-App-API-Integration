//Imports
import "./FirstScreen.css";
import image from "./tasklist.png";
import { useNavigate } from "react-router-dom";


const FirstScreen = () => {
  const navigate = useNavigate();
  //Handle Click Function
  const handleClick = () => {
    let token = localStorage.getItem("token");
    token ? navigate("/Main") : navigate("/login");
  };
  return (
    <div id="first-screen">
      <div className="content">
        <h1>Todo Task List Web App</h1>
        <p>
          Become focused, organized, and calm with Todoist. The fastest way to
          get tasks out of your head.Reach that mental clarity you’ve been
          longing for.
        </p>
        <button class="pushable" onClick={handleClick}>
          <span class="front">Let's Get Started</span>
        </button>
      </div>
      <div id="image">
        <img src={image} alt="tasklist"></img>
      </div>
    </div>
  );
};

export default FirstScreen;
