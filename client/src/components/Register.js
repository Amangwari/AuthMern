import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);

  const [inpval, setInpVal] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // console.log(inpVal);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpVal(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
    // console.log(e.target.value)
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const { fname, email, password, cpassword } = inpval;

    if (fname === "") {
      alert("please enter your name");
    } else if (email === "") {
      alert("please enter your email");
    } else if (!email.includes("@")) {
      alert("enter valid email");
    } else if (password === "") {
      alert("please enter your password");
    } else if (password.length < 6) {
      alert("password must be 6 char");
    } else if (cpassword === "") {
      alert("please enter your confirm password");
    } else if (cpassword.length < 6) {
      alert("password must be 6 char");
    } else if (password !== cpassword) {
      alert("both of password doesn't match");
    } else {
      // console.log("user registration successfully done");
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();
      console.log(res.status);

      if (res.status === 201) {
        alert("User registration Done");
        setInpVal({
          ...inpval,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };
  // console.log(inpval)
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Helloo New user</h1>
            <p>
              Hello Welcome to our Website, We are happy to serve you our
              services.
            </p>
          </div>
          <form method="post">
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpval.fname}
                name="fname"
                id="fname"
                placeholder="Enter your name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  onChange={setVal}
                  value={inpval.password}
                  id="password"
                  placeholder="Enter your email password"
                  autoComplete="on"
                />
                <div
                  className="showpass"
                  onClick={() => {
                    setPassShow(!passShow);
                  }}
                >
                  {!passShow ? "show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Confirm password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  onChange={setVal}
                  value={inpval.cpassword}
                  id="cpassword"
                  placeholder="Confirm your password"
                  autoComplete="on"
                />
                <div
                  className="showpass"
                  onClick={() => {
                    setcPassShow(!cpassShow);
                  }}
                >
                  {!cpassShow ? "show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={addUserdata}>
              Sign Up
            </button>

            <p>
              Already have a account? <NavLink to="/">Log in</NavLink>{" "}
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
