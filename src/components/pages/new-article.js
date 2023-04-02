import React, { useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./new.css";
import _ from "lodash";
import axios from "axios";
import Cookies from "js-cookie";
import FormData from "form-data";
import qs from "qs";
import * as Icon from "react-bootstrap-icons";

function NewArticle(props) {
  const form = new FormData();
  const [status, setStatus] = useState(0);
  const [success, setSuccess] = useState(0);
  const [error, setError] = useState("");
  const [picture, setPicture] = useState();
  const types = ["news", "editorial", "movie", "satire", "facts"];
  const [filter, setFilter] = useState("news");
  const [article, setArticle] = useState({
    atitle: "Untitled",
    atype: "news",
    acontent: "",
    collabEmail: "",
  });
  React.useEffect(() => {
    if (props.newarticle) {
      setStatus(1);
      setFilter(props.newarticle.atype);
      setArticle((previous) => {
        return {
          ...previous,
          atitle: props.newarticle.atitle,
          atype: props.newarticle.atype,
          acontent: props.newarticle.acontent,
        };
      });
    }
  }, [props.newarticle]);
  function HandleEdit() {
    if (
      !(
        article.atype === "" ||
        article.acontent === "" ||
        article.atitle === "Untitled"
      )
    ) {
      console.log(article);
      setSuccess(1);
      axios
        .patch(
          "https://thepc-bknd.onrender.com/api/articles/" +
            props.newarticle._id,
          qs.stringify(article),
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("token"),
              "Content-type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          setSuccess(2);
          setArticle({
            atitle: "Untitled",
            atype: "news",
            acontent: "",
            collabEmail: "",
          });
        })
        .catch((error) => {
          console.log(error);
          setSuccess(3);
        })
        .finally(() => {
          if (success === 2) {
            setTimeout(() => {
              return setSuccess(0);
            }, 1000);
          }
        });
    } else {
      setSuccess(3);
      article.atype === "" && setError("Please select the type of article.");
      article.atitle === "Untitled" &&
        setError("Uh-oh! Your article title is empty.");
      article.acontent === "" &&
        setError("You are missing the article content!");
    }
  }
  function HandleClick(event) {
    event.preventDefault();
    // Form validation
    if (status === 1) {
      HandleEdit();
    } else {
      if (
        !(
          article.atype === "" ||
          article.acontent === "" ||
          article.atitle === "Untitled"
        )
      ) {
        if (picture !== undefined) {
          setSuccess(1);
          for (const [key, value] of Object.entries(article)) {
            form.append(key, value);
          }
          form.append("picture", picture, picture.name);
          axios
            .post("https://thepc-bknd.onrender.com/api/articles", form, {
              headers: {
                Authorization: "Bearer " + Cookies.get("token"),
                "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
              },
            })
            .then((response) => {
              setSuccess(2);
              setArticle({
                atitle: "Untitled",
                atype: "news",
                acontent: "",
                collabEmail: "",
              });
            })
            .catch((err) => {
              console.log(err);
              setSuccess(3);
            })
            .finally(() => {
              if (success === 2) {
                setTimeout(() => {
                  return setSuccess(0);
                }, 1000);
              }
            });
        } else {
          setSuccess(3);
          setError("Look's like you forgot to upload a photo!");
        }
      } else {
        setSuccess(3);
        article.atype === "" && setError("Please select the type of article.");
        article.atitle === "Untitled" &&
          setError("Uh-oh! Your article title is empty.");
        article.acontent === "" &&
          setError("You are missing the article content!");
      }

      console.log(article);
    }
  }
  function HandleUpload(event) {
    const value = event.target.files[0];
    setPicture(value);
  }
  function HandleFilter(type) {
    setArticle((previous) => {
      return {
        ...previous,
        atype: type,
      };
    });
  }
  function HandleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setArticle((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  }
  return (
    <div>
      <div className="animate__animated animate__fadeIn">
        <div className="">
          <form>
            <div className="btn-group">
              {types.map((type) => {
                return (
                  <span
                    className={
                      filter === type
                        ? "badge badge-pill badge-lg badge-dark mt-0 mr-1 active"
                        : "badge badge-pill badge-lg badge-dark mt-0 mr-1"
                    }
                    onClick={() => {
                      HandleFilter(type);
                      setFilter(type);
                    }}
                  >
                    {_.upperCase(type)}
                  </span>
                );
              })}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="atitle"
                id="inputArticle"
                className="form-control"
                placeholder="Untitled"
                value={article.atitle !== "Untitled" ? article.atitle : ""}
                autoFocus
                onChange={HandleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="collabEmail"
                id="inputEmail"
                className="form-control"
                placeholder="Collaborating Author's Email"
                value={article.collabEmail}
                onChange={HandleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="acontent"
                id="inputContent"
                className="form-control "
                rows="10"
                placeholder="Start typing..."
                value={article.acontent !== "Untitled" && article.acontent}
                onChange={HandleChange}
              />
            </div>

            {status === 0 && (
              <div className="form-group">
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  onChange={HandleUpload}
                  className="file-input"
                ></input>
              </div>
            )}

            {success === 0 || success === 2 ? (
              <button
                className="btn btn-lg btn-block btn-dark btn-login btn-pink text-uppercase font-weight-bold mb-2 mt-5"
                type="submit"
                onClick={HandleClick}
              >
                {status === 0 ? "Submit Article" : "Save Changes"}
              </button>
            ) : success === 1 ? (
              <button
                className="btn btn-lg btn-block btn-outline-dark btn-login btn-pink text-uppercase font-weight-bold mb-2 mt-5"
                type="submit"
                onClick={HandleClick}
              >
                <Loader type="Audio" color="#fff" height={20} width={20} />{" "}
              </button>
            ) : (
              success === 3 && (
                <button
                  className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2 mt-5"
                  type="submit"
                  onClick={HandleClick}
                >
                  Try Again
                </button>
              )
            )}
            <div className="form-group">
              {success === 3 && (
                <div className="alert alert-danger">
                  {" "}
                  <Icon.ExclamationTriangleFill className="mb-1" /> {error}
                </div>
              )}
              {success === 2 && status === 0 && (
                <div className="alert alert-success">
                  Yay! Your article was submitted!
                </div>
              )}
              {success === 2 && status === 1 && (
                <div className="alert alert-success">
                  Yay! Your article was edited!
                </div>
              )}
              {success === 1 && (
                <div className="alert alert-warning">
                  Please bare with me. This may take a while.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewArticle;
