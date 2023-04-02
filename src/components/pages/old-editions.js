import React from "react";
import Axios from "axios";
import Cookies from "js-cookie";

function OldEditions() {
  React.useEffect(() => {
    Axios.get("https://thepc-bknd.onrender.com/api/edition", {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <h1>Old Editions</h1>;
}

export default OldEditions;
