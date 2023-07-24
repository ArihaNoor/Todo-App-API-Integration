import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Header = () => {
  let data = localStorage.getItem("user");
  const user = JSON.parse(data);
  const navigate = useNavigate();
  const showSuccessToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showErrorToastMessage = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleLogout = () => {
    let token = localStorage.getItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/logout`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          showSuccessToastMessage('Logged out successfully.');
          navigate("/");
        }else{
          showErrorToastMessage('User not logged out');
        }
      })
      .catch((error) => showErrorToastMessage("Error : " + error.message));
  };
  return (
    <div id="header">
      <ToastContainer />
     <div className="logo"> 
     <h1>Todo List</h1>
     </div>
      <div className="logout">
        <h3>Logged In as: {user?.name}</h3>
        <button className="logout-btn">
          <Link
            className="logout-link"
            onClick={() => {
              handleLogout();
            }}
          >
            LOGOUT
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
