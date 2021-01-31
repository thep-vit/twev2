import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'
import {ExclamationTriangleFill} from 'react-bootstrap-icons'
import './articles.css'

function Dash() {
    const[current, setCurrent] = useState([])
    useEffect(()=>{
        Axios.get("https://thepc.herokuapp.com/api/messages/allMessages", {
        headers: {
            'Authorization': 'Bearer ' +  Cookies.get("token")
        }
    }).then((response)=>{
        console.log(response.data)
        setCurrent(response.data)
    }).catch((error)=>{
        console.log(error);
    })
    },[])
    
    return (
        <div className="animate__animated animate__fadeIn">
            {/* <h1>Welcome to TWE Online!</h1> */}
            <center>
            {/* <img src="../img/twe_logo.png" alt="The Weekly Edge Logo" /> */}
            </center>
            <h3>Important Messages</h3>
            <div className="body-top">
                            {current.length === 0 ?
                                <div className="badge badge-dark badge-md badge-comment">
                                    <span className="feather"><ExclamationTriangleFill className="mb-1 mr-1" /> </span> No messages!
                            </div>
                                :
                                current.map((comment) => {
                                    return (
                                        <div className="card mt-1 card-comment" >
                                           <p className="card-title"> {comment.message}</p>
                                           <p className="text-muted"><small>{comment.createdBy.name}</small> </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
        </div>


    )
                        
}

export default Dash;