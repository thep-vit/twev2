import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./articles.css";
import ArticleView from "./article-view";

function YourArticle(props) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState();
  const [fact, setFact] = useState();
  const [fetch, setFetch] = useState(true);
  React.useEffect(() => {
    axios
      .get("https://catfact.ninja/fact?max_length=240", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFact(response.data.fact);
      });
  }, []);
  React.useEffect(() => {
    if (fetch) {
      axios
        .get(
          "https://thepc-bknd.onrender.com/api/articles/list?sortBy=createdAt:desc",
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setArticles(response.data);
          setLoading(false);
          setFetch(false);
        })
        .catch((error) => {
          setLoading(false);
          setFetch(false);
        });
    }
  }, []);

  return (
    <div className="container">
      {loading && (
        <div>
          <h3>While you wait, did you know that</h3>
          <br />
          <h6 style={{ width: "50%" }}>{fact}</h6>
          <br />
          <div className="container-articles">
            <div className="loader">
              <Loader
                type="TailSpin"
                color="#ff1e56"
                height={100}
                width={100}
                timeout={30000}
              />
            </div>
          </div>
        </div>
      )}
      {!loading && <ArticleView articlesProps={articles} valid={props.valid} />}
    </div>
  );
}

export default YourArticle;
