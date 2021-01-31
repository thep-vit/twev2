import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../../pages/dashboard";
import * as Icon from 'react-bootstrap-icons'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import "./onboarding.css";
import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";

function OnBoard(props) {
  const [page, setPage] = React.useState(0);
  const [admin, setAdmin] = React.useState();
  const [error, setError] = React.useState();
  const [status, setStatus] = React.useState(0);
  React.useEffect(() => {
    if (props.admin === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [props.admin]);

  function HandleClick(val) {
    //   console.log(admin);
    //   console.log(props.admin);
    setPage(val);
  }
//   function HandleFinish() {
//       console.log(status);
//     setStatus(1);
//     console.log(status);
//   }
  React.useEffect(() => {
    if (status === 1) {
      axios
        .patch("https://thepc.herokuapp.com/api/onboard/", qs.stringify({}), {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
        .then((res) => {
            console.log(res);
          Cookies.set("onb", "true");
          setStatus(2);
        })
        .catch((err) => {
          setStatus(3);
        });
    }
  }, [status]);

  if (status !== 2) {
    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          {
            //Use this to change the image on the left
          }
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div
            className="col-md-8 col-lg-6"
            style={{ backgroundColor: "rgb(30,30,30)" }}
          >
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    {page === 0 ? (
                      <div>
                        <center>
                          <h1 className="login-heading mb-4 onb-heading">
                            Welcome to TWE
                          </h1>

                          <p className="onboard-desc">
                            The dashboard is our treasury of articles, the last
                            step before it gets published. It is the place where
                            you upload your work for your Editor-in-Chief to
                            approve. You also get to view the articles written
                            by you and your peers and give and receive feedback.
                          </p>
                          <button
                            className="btn btn-lg btn-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2 mt-5"
                            onClick={() => HandleClick(1)}
                          >
                            Proceed
                          </button>
                          <div className="form-label-group text-center"></div>
                        </center>
                      </div>
                    ) : page === 1 ? (
                      <div>
                        <center>
                          <h1 className="login-heading mb-4 onb-heading">
                            Submit an article
                          </h1>

                          <p className="onboard-desc">
                            This is the page where you upload your article.
                            Follow these steps to submit your article:- <br />
                            <br />
                            1. Choose your category and Article title. <br />
                            2. Paste your article and add the collaborating
                            author.
                            <br />
                            3. Upload a picture related to the article. <br />
                            You’re good to go!
                          </p>
                          <button
                            className="btn btn-lg btn-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2 mt-5"
                            onClick={() => HandleClick(2)}
                          >
                            Proceed
                          </button>
                          <button
                            className="btn btn-lg btn-dark btn-outline btn-block btn-login text-uppercase font-weight-bold mb-2"
                            onClick={() => HandleClick(0)}
                          >
                            Back
                          </button>
                          <div className="form-label-group text-center"></div>
                        </center>
                      </div>
                    ) : page === 2 ? (
                      <div>
                        <center>
                          <h1 className="login-heading mb-4 onb-heading">
                            View an article
                          </h1>

                          <p className="onboard-desc">
                            This is the page where you can view your previous
                            article and find out if your current piece is
                            approved or not. <br />
                            <br />
                             Click on an article title to view <br />
                            <Icon.PencilFill /> - Edit article
                            <br />
                            <Icon.ChatFill /> - Comment on article
                            <br />
                            <Icon.TrashFill />  - Delete article <br /> <br />
                            To view your peers' work, you can check out the 'All
                            Articles' page.
                          </p>
                          {admin ? 
                          <button
                            className="btn btn-lg btn-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2 mt-5"
                            onClick={() => HandleClick(3)}>
                            Proceed
                          </button>
                          :
                         status === 1 ?
                            <button className="btn btn-lg btn-outline-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2" type="submit"><Loader type="Audio" color="#fff" height={20} width={20} /> </button>
                        :
                          <button
                          className="btn btn-lg btn-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2 mt-5"
                          onClick={()=>setStatus(1)}>
                          Get Started
                        </button>
                          }
 
                          <button
                            className="btn btn-lg btn-dark btn-outline btn-block btn-login text-uppercase font-weight-bold mb-2"
                            onClick={() => HandleClick(1)}>
                            Back
                          </button>
                          <div className="form-label-group text-center">
                            {error}
                          </div>
                        </center>
                      </div>
                    ) : page === 3 ? (
                      <div>
                        <center>
                          <h1 className="login-heading mb-4 onb-heading">
                            Approve/Reject Articles
                          </h1>

                          <p className="onboard-desc">
                          As Editor-in-Chief you are responsible for approving/rejecting articles submitted by other authors.<br/><br/>

                        From the menu panel, <br />
                        Click <Icon.EmojiHeartEyesFill /> to Approve <br />
                        Click <Icon.EmojiAngryFill /> to Reject <br />

Only articles that have been approved can be added to an edition to be published.
                          </p>
                          <button
                            className="btn btn-lg btn-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2 mt-5"
                            onClick={() => HandleClick(4)}>
                            Proceed
                          </button>
                          <button
                            className="btn btn-lg btn-dark btn-outline btn-block btn-login text-uppercase font-weight-bold mb-2"
                            onClick={() => HandleClick(2)}
                          >
                            Back
                          </button>
                          <div className="form-label-group text-center"></div>
                        </center>
                      </div>
                    ) : (
                      <div>
                        <center>
                          <h1 className="login-heading mb-4 onb-heading">
                            Publish an Edition
                          </h1>

                          <p className="onboard-desc">
                            1. Enter the edition details <br />
                            2. Add the HoV link <br />
                            3. Click to select/de-select articles from the list <br />
                            4. Click Publish Edition <br />
                          </p>
                          {
                         status === 1 ?
                            <button className="btn btn-lg btn-outline-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2" type="submit"><Loader type="Audio" color="#fff" height={20} width={20} /> </button>
                        :
                          <button
                          className="btn btn-lg btn-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2 mt-5"
                          onClick={()=> setStatus(1)}>
                          Get Started
                        </button>
                          }
                        <button
                            className="btn btn-lg btn-dark btn-outline btn-block btn-login text-uppercase font-weight-bold mb-2"
                            onClick={() => HandleClick(3)}
                          >
                            Back
                          </button>
                          <div className="form-label-group text-center"></div>
                        </center>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Dashboard />;
  }
}

export default OnBoard;
