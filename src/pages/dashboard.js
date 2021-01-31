import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Navbar from "../components/dashboard/navbar";
import Sidebar from "../components/dashboard/sidebar";
import Page from "../components/dashboard/page";
import OnBoard from "../components/dashboard/onboarding"
import Cookies from "js-cookie";
import axios from "axios";
import qs from "qs";

function Dashboard() {
  const { page } = useParams();
  const [valid, setValid] = useState();
//   const [onboarded, setOnboarded] = useState(Cookies.get("onb"));
  function handleAuth(response) {
    if (response.admin === false) {
      setValid("true");
    } else if (response.admin === true) {
      setValid("admin");
    } else {
      setValid("false");
    }
  }

  React.useEffect(() => {
    axios
      .post("https://thepc.herokuapp.com/api/check/auth", qs.stringify({}), {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((response) => {
        handleAuth(response.data);
      });
  }, []);
  
  if (Cookies.get("token")) {
    if (Cookies.get("onb") === "false") {
      return (
      <OnBoard admin={valid}/>
      );
    } else {
      return (
        <div className="">
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <Sidebar page={page} valid={valid} />
              <Page page={page} valid={valid} />
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
}

export default Dashboard;
