import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import _ from 'lodash'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import axios from 'axios'
import qs from 'qs'
import NewArticle from './new-article'

function ArticleView(props) {
    const articles = props.articlesProps
    // const [newarticle, setNewarticle] = useState({})
    const valid = props.valid
    const [current, setCurrent] = useState({
        comments: []
    })
    const[comm, setComm] = useState("")
    const [choice, setChoice] = useState()
    const [filter, setFilter] = useState("All")
    const [status, setStatus] = useState(0)
    const types = ["news", "editorial", "movie", "satire", "facts"]
    function HandleArticle(event) {
        setCurrent(event)
    }
    function HandleComment(event){
        const value = event.target.value
        setComm(value)
    }
    function HandleChange(event) {
        setChoice(event)
        const name = event
        setStatus(1)
        switch (event) {
            case "approved":
            case "rejected":
                axios.patch("https://thepc.herokuapp.com/api/articles/" + current._id, qs.stringify({
                    atitle: current.atitle,
                    atype: current.atype,
                    acontent: current.acontent,
                    approved: name
                }), {
                    headers: {
                        'Authorization': 'Bearer ' + Cookies.get("token"),
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then((response) => {
                    setStatus(2)
                }).catch(error => {
                    console.log(error);
                    setStatus(3)
                })
                break;
            case "trash":
                axios.delete("https://thepc.herokuapp.com/api/articles/" + current._id, {
                    headers: {
                        'Authorization': 'Bearer ' + Cookies.get("token")
                    }
                }, qs.stringify({})
                ).then((response) => {
                    response.status && setStatus(2)
                }).catch(error => {
                    console.log(error);
                    setStatus(3)
                })
                break;
            case "comment": 
            axios.post("https://thepc.herokuapp.com/api/articles/comment/" + current._id, qs.stringify({
                comment: comm
            }), {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get("token"),
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                setStatus(2)
            }).catch(error => {
                console.log(error);
                setStatus(3)
            }).finally(()=>{
                setTimeout(()=>{
                    return (
                        setStatus(0)
                    )
                },1000)
                
            })
                break;
            default:
                break;
        }
    }
    return (
        <div className="container-fluid ">
            <div className="row btn-group">
                <span className={filter === "All" ? "badge badge-pill badge-lg badge-dark mt-0 mr-1 active" : "badge badge-pill badge-lg badge-dark mt-0 mr-1"} onClick={() => setFilter("All")}>{_.upperCase("All")}</span>
                {types.map((type) => {
                    return (
                        <span className={filter === type ? "badge badge-pill badge-lg badge-dark mt-0 mr-1 active" : "badge badge-pill badge-lg badge-dark mt-0 mr-1"} onClick={() => setFilter(type)}>{_.upperCase(type)}</span>
                    )
                })}
            </div>
            {articles? <div className="row">
                <div className="col-md-3 left animate__animated animate__fadeIn animate__fast">
                    {articles.length !== 0 || articles !== undefined ? articles.map((article) => {
                        if (filter !== "All") {
                            if (article.atype === filter) {
                                return (
                                    <div className="card mb-3" onClick={() => { HandleArticle(article) }}>
                                        <div className="">
                                            <div className="card-right">
                                                <span className="badge badge-pill badge-dark mt-0 mr-1">{_.upperCase(article.atype)}</span>
                                                {article.editionNumber ? <span className="badge badge-pill badge-primary mt-0 mr-1">{article.editionNumber}</span>
                                                    :
                                                    article.approved === "approved" ? <span className="badge badge-pill badge-success mt-0 mr-1">A</span>
                                                        :
                                                        <span className="badge badge-pill badge-warning mt-0 mr-1"> <Icon.Clock color="#fff" /> </span>
                                                }

                                                <h5 className="card-title">{article.atitle}</h5>
                                                <p className="text-muted mb-0 mt-0"><small>{article.authorName} {article.collabAuthorName && " and " + article.collabAuthorName}</small> </p>
                                                                                        </div>

                                        </div>
                                    </div>
                                )
                            }
                        } else {
                            return (
                                <div className="card mb-3" onClick={() => { HandleArticle(article) }}>
                                    <div className="">
                                        <div className="card-right">
                                            <span className="badge badge-pill badge-dark mt-0 mr-1">{_.upperCase(article.atype)}</span>
                                            {article.editionNumber ? <span className="badge badge-pill badge-primary mt-0 mr-1">{article.editionNumber}</span>
                                                :
                                                (article.approved === "approved" && article.editionNumber !== null) || (status === 2 && choice === "approved") ? <span className="badge badge-pill badge-success mt-0 mr-1">A</span>
                                                    :
                                                    article.approved === "pending" ? <span className="badge badge-pill badge-warning mt-0 mr-1"> <Icon.Clock color="#fff" /> </span>
                                                        :
                                                        article.approved === "rejected" || (status === 2 && choice === "rejected") ? <span className="badge badge-pill badge-danger mt-0 mr-1">X</span>
                                                            : null}

                                            <h5 className="card-title">{article.atitle}</h5>
                                            <p className="text-muted mb-0 mt-0"><small>{article.authorName} {article.collabAuthorName && " and " + article.collabAuthorName}</small> </p>
                                              </div>

                                    </div>
                                </div>
                            )
                        }
                    }) :
                        <h1>You have not written your first article yet!</h1>
                    }


                </div>
                <div className="col-md-9 right animate__animated animate__fadeIn">
                    {!current.atitle ?
                        <div className="container-articles">
                            {articles.length !== 0 ? <h1 className="mt-5"><span><Icon.Arrow90degLeft /> </span>Click on any article to view it!</h1> :
                                <div>
                                    <h1>You have not submitted your first article yet!</h1>
                                    <a href="/dashboard/new article"><button className="btn btn-lg btn-dark btn-block">Submit an Article</button></a>
                                </div>}
                        </div>
                        :
                        <div className="animate__animated animate__fadeIn animate__fast">
                            <div className="">
                                <div className="container-fluid">

                                    <center><img src={"https://thepc.herokuapp.com/api/articles/" + current._id + "/picture"} className="img-responsive" alt={current.atitle} />
                                        {status !== 1 ?
                                            <span className="badge badge-md badge-pill mt-2 mr-0 badge-dark badge-tools">
                                                {valid === "admin" && <span className="badge badge-pill badge-md icon"> <Icon.EmojiHeartEyesFill className="check" name="approve" onClick={() => HandleChange("approved")} /> </span>}
                                                {valid === "admin" && <span className="badge badge-pill badge-md icon"> <Icon.EmojiAngryFill className="x" onClick={() => HandleChange("rejected")} /> </span>}
                                                {current.author === Cookies.get("id") && <span className="badge badge-pill badge-md icon"> <Icon.PencilFill className="pencil" data-toggle="modal" data-target="#exampleModal" /> </span>}
                                                {current.author === Cookies.get("id") && <span className="badge badge-pill badge-md icon"> <Icon.TrashFill className="trash" onClick={() => HandleChange("trash")} /> </span>}
                                                <span className="badge badge-pill badge-md icon"  > <Icon.ChatFill className="comment" data-toggle="modal" data-target="#commentsModal" /></span>

                                            </span>
                                            :
                                            <span className="badge badge-md badge-pill mt-2 mr-0 badge-dark badge-tools">
                                                <Loader type="Audio" color="#ff1e56" width="2rem" height="2rem" />
                                            </span>

                                        }
                                    </center>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="float-left">
                                            <span className="badge badge-md badge-pill badge-dark mt-2 mr-1">{_.upperCase(current.atype)}</span>
                                            {current.editionNumber ? <span className="badge badge-md badge-pill badge-primary mt-2 mr-1">{current.editionNumber}</span>
                                                :
                                                current.approved === "approved" ? <span className="badge badge-md badge-pill badge-success mt-2 mr-1">A</span>
                                                    :
                                                    current.approved === "pending" ? <span className="badge badge-md badge-pill badge-warning mt-2 mr-1"> <Icon.Clock color="#fff" /> </span>
                                                        :
                                                        current.approved === "rejected" && <span className="badge badge-pill badge-md badge-danger mt-0 mr-1">REJECTED</span>

                                            }
                                            {choice === "trash" && status === 2 &&
                                                <span className="badge badge-pill badge-md badge-danger mt-0 mr-1">{_.upperCase("deleted")}</span>
                                            }
                                            {choice === "approved" && status === 2 &&
                                                <span className="badge badge-pill badge-md badge-success mt-0 mr-1">{_.upperCase("approved")}</span>
                                            }
                                            {choice === "edit" && status === 2 &&
                                                <span className="badge badge-pill badge-md badge-info mt-0 mr-1">{_.upperCase("edited")}</span>
                                            }
                                            {choice === "rejected" && status === 2 &&
                                                <span className="badge badge-pill badge-md badge-danger mt-0 mr-1">{_.upperCase("rejected")}</span>
                                            }
                                        </div>
                                        <div className="float-right">
                                        </div>
                                    </div>
                                    <h2 className="title">{current.atitle}</h2>
                                    <h5 className="text-light">{current.authorName} {current.collabAuthorName && " and " + current.collabAuthorName}</h5>
                                </div>
                            </div>
                            <div className="">
                                <div class="container-fluid container-content">
                                    <p className="content">{current.acontent}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>


            </div> :<></> }
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Article</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <NewArticle newarticle={current} />
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal fade" id="commentsModal" tabindex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{current.atitle}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body body-top">
                            {current && current.comments.length === 0 ?
                                <div className="badge badge-dark badge-md badge-comment">
                                    <span className="feather"><Icon.ExclamationTriangleFill className="mb-1 mr-1" /> </span> Nobody has commented on this article yet!
                            </div>
                                :
                                current.comments.map((comment) => {
                                    return (
                                        <div className="card mt-1 card-comment" >
                                           <p className="card-title"> {comment.comment}</p>
                                           <p className="text-muted">{comment.createdBy}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="modal-body border-top">
                            <div className="form-group">
                                <input type="text" name="comment" id="comment" className="form-control" placeholder="New comment" onChange={HandleComment} autoFocus />
                                {status === 0 || status === 2 ?
                                                        <button className="btn btn-lg btn-dark btn-block btn-login btn-pink text-uppercase font-weight-bold mb-1 mt-3" type="submit" onClick={()=> HandleChange("comment")}>Comment</button>
                                                        : status === 1 ?
                                                            <button className="btn btn-lg btn-outline-dark btn-block btn-login btn-pink text-uppercase font-weight-bold mb-1 mt-3" ><Loader type="Audio" color="#fff" height={20} width={20} /> </button>
                                                            :
                                                            status === 3 &&
                                                            <button className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-1 mt-3" type="submit" onClick={()=> HandleChange("comment")}>Try Again</button>

                                                    } 
                                {status === 2 &&
                                        <div className="alert alert-success">Commented!</div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleView;