import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Dashboard() {
  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log();
  // console.log(logindata.ValidUserOne.email);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token)

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    // console.log(data)

    if (data.status === 401 || !data) {
      history("*");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./man.png"
            style={{ width: "200px", marginTop: "20px" }}
            alt="img"
          />
          <h1 style={{ marginTop: "2rem" }}>
            Email:- {logindata ? logindata.ValidUserOne.email : ""}
          </h1>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          loading... &nbsp;
          <CircularProgress />
        </Box>
      )}{" "}
    </>
  );
}

export default Dashboard;
