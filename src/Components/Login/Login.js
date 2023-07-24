import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const showErrorToastMessage = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleLogin = () => {
    setisLoading(true); 
    if (!userEmail || !password) {
      showErrorToastMessage("Input Fields are required");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: userEmail,
        password: password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/login`, requestOptions)
        .then((response) => response.json())
        .then((userObj) => {
          if (userObj.success === true) {
            localStorage.setItem("user", JSON.stringify(userObj.user));
            localStorage.setItem("token", userObj.token);
            navigate("/Main");
          } else {
            showErrorToastMessage("Invalid credentials");
          }
        })
        .catch((error) => {
          showErrorToastMessage(error);
        })
        .finally(() => {
          setisLoading(false); 
        });
    }
  };

  return (
    <div id="login-page">
      <ToastContainer />
      <div className="login-left">
        <i class="fa fa-solid fa-user-check login-icon"></i>
        <h1>Login</h1>
        <p>Sign in to your Account..</p>
        <input
          type="email"
          placeholder="User Email"
          name="uemail"
          className="input-login"
          onChange={(e) => setUserEmail(e.target.value)}
        ></input>
        <span className="span">*</span>
        <br />
        <input
          type="password"
          placeholder="Password"
          name="upass"
          className="input-login"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="span">*</span>
        <br></br>
        {isLoading ? ( 
          <Loader />
        ) : (
          <button className="btn-login" onClick={handleLogin}>
            Login
          </button>
        )}
        <br></br>
        <Link to="/register" className="link">
          <p>Don't Have an Account?</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
