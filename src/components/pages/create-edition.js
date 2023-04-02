import React, { useState } from "react";
import "./edition.css";
import _ from "lodash";
import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function CreateEdition() {
  const [link, setLink] = useState("");
  const [success, setSuccess] = useState(0);
  const list = [];
  const [error, setError] = useState("Error");
  const [edition, setEdition] = useState({
    enumber: "",
    ename: "",
    edesc: "",
    hov: "",
    articles: [],
  });
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState({});
  function HandleChange(event) {
    const { name, value } = event.target;
    if (name === "hov") {
      setLink(value);
    }
    setEdition((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  }
  function HandleArticle(id) {
    function checkArticle(search) {
      return search === id;
    }
    const found = edition.articles.some(checkArticle);
    if (!found) {
      setEdition((previous) => {
        return {
          ...previous,
          articles: [...previous.articles, id],
        };
      });
    } else {
      const array = edition.articles;
      const index = array.indexOf(id);
      array.splice(index, 1);
      setEdition((previous) => {
        return {
          ...previous,
          articles: array,
        };
      });
    }
  }
  function HandleClick() {
    setSuccess(1);
    axios
      .post("https://thepc-bknd.onrender.com/api/edition/create", edition, {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setSuccess(2);
        setEdition({
          enumber: "",
          ename: "",
          edesc: "",
          hov: "",
          articles: [],
        });
      })
      .catch((err) => {
        setError(err.body);
        console.log(err);
        setSuccess(3);
      });
    console.log(edition);
  }
  React.useEffect(() => {
    axios
      .get("https://thepc-bknd.onrender.com/api/approvedArticles", {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }, []);
  return (
    <div className="container container-edition animate__animated animate__fadeIn">
      <center>
        <div className="row">
          <div className="col-md-6">
            <div className="row no-gutters">
              <div className="col-sm-2">
                <div className="form-group">
                  <input
                    type="text"
                    name="enumber"
                    id="inputArticle"
                    className="form-control"
                    placeholder="E. No."
                    autoFocus
                    onChange={HandleChange}
                  />
                </div>
              </div>
              <div className="col-sm-10">
                <div className="form-group">
                  <input
                    type="text"
                    name="ename"
                    id="inputArticle"
                    className="form-control"
                    placeholder="Untitled"
                    onChange={HandleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="hov"
                id="inputEmail"
                className="form-control"
                placeholder="HoV Link"
                onChange={HandleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="edesc"
                id="inputContent"
                className="form-control "
                rows="4"
                placeholder="Edition Description"
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {link !== "" ? (
                <iframe
                  src={link}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div name="acontent" id="preview" className="form-control">
                  VIDEO PREVIEW
                </div>
              )}
            </div>
          </div>
        </div>
      </center>
      <div className="article-list">
        {loading && (
          <div className="loader mt-0">
            <Loader
              type="TailSpin"
              color="#ff1e56"
              height={100}
              width={100}
              timeout={30000}
            />
            <p>Fetching Articles...</p>
          </div>
        )}
        {!loading &&
          articles.map((article) => {
            if (
              article.approved === "approved" &&
              article.editionNumber === undefined
            ) {
              function checkArticle(id) {
                return id === article._id;
              }
              const found = edition.articles.some(checkArticle);
              return (
                <div
                  className="card mb-3 mr-5"
                  onClick={() => HandleArticle(article._id)}
                >
                  <div className="">
                    <div className="card-right">
                      <span className="badge badge-pill badge-dark mt-0 mr-1">
                        {_.upperCase(article.atype)}
                      </span>
                      {found && (
                        <span className="badge badge-pill badge-primary mt-0 mr-1">
                          {edition.enumber}
                        </span>
                      )}
                      <h5 className="card-title">{article.atitle}</h5>
                      <p className="text-muted">
                        <small>
                          {article.authorName}{" "}
                          {article.collabAuthorName &&
                            " and " + article.collabAuthorName}
                        </small>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
      {success === 0 ? (
        <button
          className="btn btn-lg btn-block btn-dark btn-login btn-pink text-uppercase font-weight-bold mb-2 mt-4"
          type="submit"
          onClick={HandleClick}
        >
          Publish Edition
        </button>
      ) : success === 1 ? (
        <button
          className="btn btn-lg btn-block  btn-outline-dark btn-login btn-pink text-uppercase font-weight-bold mb-2 mt-4"
          type="submit"
          onClick={HandleClick}
        >
          <Loader type="Audio" color="#fff" height={20} width={20} />{" "}
        </button>
      ) : (
        success === 3 && (
          <button
            className="btn btn-lg btn-block  btn-danger btn-login text-uppercase font-weight-bold mb-2 mt-4"
            type="submit"
            onClick={HandleClick}
          >
            Try Again
          </button>
        )
      )}
      <div className="form-group">
        {success === 3 && (
          <div className="alert alert-danger mt-2">{error}</div>
        )}
        {success === 2 && (
          <div className="alert alert-success mt-2">
            Yay! The edition was published!
          </div>
        )}
        {success === 1 && (
          <div className="alert alert-warning mt-2">
            Please bare with me. This could take a while.
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateEdition;
