// import { Link } from "@mui/material";
import React, { useState } from "react";
import { NavLink,  useNavigate  } from "react-router-dom";
import "./mix.css";

function Login() {
  const [passShow, setPassShow] = useState(false);
  
  const [inpval, setInpVal] = useState({
    email: "",
    password: "",
  });
  
  // for navigating page
  const  history = useNavigate();


  // console.log(inpval);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpVal(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };



  // login button function call
  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      alert("Enter your email");
    } else if (!email.includes("@")) {
      alert("Please enter valid email");
    } else if (password === "") {
      alert("Enter your password");
    } else if (password.length < 6) {
      alert("Password must be 6 characters");
    } else {
      // alert("User login successfully done")
      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token)
        history("/dash")
        setInpVal({
          ...inpval,
          email: "",
          password: "",
        });
      }
    }
  };
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hello, Please login.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={inpval.email}
                onChange={setVal}
                name="email"
                id="email"
                placeholder="Enter your email address"
                autoComplete="on"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={inpval.password}
                  onChange={setVal}
                  name="password"
                  id="password"
                  placeholder="Enter your email password"
                  autoComplete="on"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginuser}>
              Login
            </button>

            <p>
              Don't have an Account? <NavLink to="/register"> Sign Up</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
