import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader'

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uname, setName] = useState("");
  const [uemail, setEmail] = useState("");
  const [upass, setPassword] = useState("");

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

  const handleRegister = () => {
    setIsLoading(true);
    if (!uname || !uemail || !upass) {
      showErrorToastMessage("Input All Fields");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: uname,
        email: uemail,
        password: upass,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/register`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if(result.success===true){
            showSuccessToastMessage("Successfully registered");
            setIsLoading(false);
            navigate("/login");
          }else{
            <Loader />
          }
        })
        .catch((error) => {
          showErrorToastMessage(error);
        });
    }
  };

  return (
    <div id="register-page">
      <ToastContainer />
      <div className="register-left">
      <i class="fa fa-solid fa-user-plus register-icon"></i>
        <h1>Create Account</h1>
        <p>Create Your New Account...</p>
        <input
          type="text"
          placeholder="User Name"
          name="uname"
          className="input"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <span className="span">*</span>
        <br />
        <input
          type="email"
          placeholder="User Email"
          name="uemail"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <span className="span">*</span>
        <br />
        <input
          type="password"
          placeholder="Password"
          name="upass"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="span">*</span>
        <br></br>
        {upass.length < 8 ? (
          <p className="password">Password Must Contain at least 8 character</p>
        ) : (
          <p></p>
        )}
        <br></br>
        <Link to="/">
          <button className="btn-register" onClick={handleRegister}>
            Register
          </button>
        </Link>
        <Link to="/login" className="link">
          <p>Already Have an Account?</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
