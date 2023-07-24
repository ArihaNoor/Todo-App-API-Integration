import './Main.css';
import './AddTodo.css';
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../BaseURL/BaseURL";
import Loader from "../Loader/Loader.js";
import Header from '../Header/Header';

const Main = () => {
  const showErrorToastMessage = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showSuccessToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [isLoading, setIsLoading] = useState(true); 
  const result = localStorage.getItem("user");
  const data = JSON.parse(result);
  const token = localStorage.getItem("token");
  const [task, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/me`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          setTask(result.tasks);
          setIsLoading(false); 
        } else {
          setIsLoading(false); 
          showErrorToastMessage("Failed to fetch tasks");
        }
      })
      .catch((error) => {
        setIsLoading(false); 
        showErrorToastMessage("Error : " + error.message)
      });
  };

  useEffect(() => {
    fetchTasks(); 
  });

  const HandleAddTask = () => {
    setIsLoading(true); 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: title,
      description: description,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${BASE_URL}/addtask`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          fetchTasks(); 
          showSuccessToastMessage("Task Added Successfully");
          HideModal();
        } else {
          setIsLoading(false); 
          showErrorToastMessage("Failed to add task");
        }
      })
      .catch((error) => {
        setIsLoading(false); 
        showErrorToastMessage("Error : " + error.message)
      });
  };

  const HandleDeleteTask = (id) => {
    setIsLoading(true); 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/removeTask/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          fetchTasks(); 
          showSuccessToastMessage("Task Removed Successfully");
        } else {
          setIsLoading(false); 
          showErrorToastMessage("Failed to remove task");
        }
      })
      .catch((error) => {
        setIsLoading(false); 
        showErrorToastMessage("Error : " + error.message)
      });
  };

  const HandleEditTask = (id) => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);
    var raw = "";

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/updatetask/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchTasks(); 
      })
      .catch((error) => {
        setIsLoading(false); 
        showErrorToastMessage("Error : " + error.message)
      });
  };

  const showModal = () => {
    var modal = document.getElementById("Modal");
    modal.style.display = "block";
    let blur = document.getElementById("content");
    blur.classList.add("blur");
  };

  const HideModal = () => {
    var modal = document.getElementById("Modal");
    modal.style.display = "none";
    let blur = document.getElementById("content");
    blur.classList.remove("blur");
  };

  return (
    <div id="Main-Screen">
      <ToastContainer />
      {isLoading && <Loader />}
      <Header />
      <div id="content">
        <div id="main-content">
          {task &&
            task.map((tasks) => (
              <div key={tasks._id} id="task-card">
                <input
                  type="checkbox"
                  className="check"
                  checked={tasks.completed === true ? "checked" : ""}
                ></input>
                <div className="title">
                  <h1 className={tasks.completed === true ? "completed" : ""}>
                    {tasks.title}
                  </h1>
                  <p className={tasks.completed === true ? "completed" : ""}>
                    "{tasks.description}"
                  </p>
                </div>
                <div
                  className="buttons"
                  onClick={() => {
                    HandleEditTask(tasks._id);
                  }}
                >
                  <Link>
                    <button className="btn-edit">
                      <i class="fa fa-solid fa-check-double"></i>
                    </button>
                  </Link>
                  <Link>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        HandleDeleteTask(tasks._id);
                      }}
                    >
                      <i class="fa fa-solid fa-trash"></i>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <button className="btn-add" onClick={() => showModal()}>
          <Link>
            <i class="fa fa-solid fa-plus add-icon"></i>
          </Link>
        </button>
      </div>
      <div id="Modal">
        <div id="addTodo">
          <h1>Add Task</h1>
          <label>Enter Title For Task:</label>
          <input
            required
            type="text"
            className="add-input"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <br></br>
          <label>Enter Description For Task:</label>
          <textarea
            required
            cols="5"
            rows="4"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <br></br>
          <div className="add-links">
            <Link className="addbutton" onClick={() => HandleAddTask()}>
              Add Task
            </Link>
            <Link className="addbutton" onClick={() => HideModal()}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Main;
