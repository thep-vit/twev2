import Axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import './new.css'
import md5 from 'md5'

function Extras() {
    const [sec, setSec] = useState({})
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState(0)
    // 0 is for security questions
    // 1 is for admin messages
    // 2 is for article types
    const [success, setsuccess] = useState(0)
    function HandleChange(event) {
        const { name, value } = event.target
                if(status === 0){
            setSec((previous) => {
                return {
                    ...previous,
                    [name]: value
                }
            })
        } else if(status === 1){
            setMessage(value)
        }
        
    }
    function HandleClick(status) {
        setStatus(status)
        setsuccess(1)
        if(status === 0) {
        setSec((previous) => {
            return {
                ...previous,
                securityAnswer: md5(previous.securityAnswer)
            }
        })
        Axios.post("https://thepc.herokuapp.com/api/user/securityQuestion/add", qs.stringify(sec), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + Cookies.get('token')
            }
        }).then((response) => {
            setsuccess(2)
        }).catch((response) => {
            setsuccess(3)
        }).finally(() => {
            if (success === 2) {
                setTimeout(() => {
                    return (
                        setsuccess(0)
                    )
                }, 1000)
            }
        })
    } else if(status === 1) {
        Axios.post("https://thepc.herokuapp.com/api/messages/post", qs.stringify({message: message}), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + Cookies.get('token')
            }
        }).then((response) => {
            setsuccess(2)
        }).catch((response) => {
            setsuccess(3)
        }).finally(() => {
            if (success === 2) {
                setTimeout(() => {
                    return (
                        setsuccess(0)
                    )
                }, 1000)
            }
        })
    }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                <h3>Security</h3>

                                    <div className="form-group">
                        <input type="text" name="securityQuestion" id="inputEmail" className="form-control" placeholder="Security Question" autoFocus onChange={HandleChange} onClick={()=> setStatus(0)} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="securityAnswer" id="inputEmail" className="form-control" placeholder="Security Answer" onChange={HandleChange} onClick={()=> setStatus(0)} />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email Address" onChange={HandleChange}onClick={()=> setStatus(0)} />
                    </div>
                    {success === 0 || success === 2?
                        <button className="btn btn-lg btn-dark btn-block btn-login btn-pink text-uppercase font-weight-bold mb-1 mt-3" type="submit" onClick={() => HandleClick(0)}>Set Q&A</button>
                        : success === 1 && status === 0 ?
                            <button className="btn btn-lg btn-outline-dark btn-block btn-login btn-pink text-uppercase font-weight-bold mb-1 mt-3" ><Loader type="Audio" color="#fff" height={20} width={20} /> </button>
                            :
                            success === 3 && status === 0 &&
                            <button className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-1 mt-3" type="submit" onClick={() => HandleClick(0)}>Try Again</button>

                    }
                    {success === 2 && status === 0 && 
                        <div className="alert alert-success">Your security preference is updated!</div>
                    }
                </div>
                <div className="col-md-6">
                <h3>Admin Messages</h3>
                <div className="form-group">
                        <textarea name="message" id="inputContent" className="form-control" placeholder="Security Answer" rows="6" onChange={HandleChange} onClick={()=> setStatus(1)}/>
                        {success === 0 || success === 2?
                        <button className="btn btn-lg btn-dark btn-block btn-login btn-pink text-uppercase font-weight-bold mb-1 mt-3" type="submit" onClick={() => HandleClick(1)}>Post message</button>
                        : success === 1 && status === 1?
                            <button className="btn btn-lg btn-outline-dark btn-block btn-login btn-pink text-uppercase font-weight-bold mb-1 mt-3" ><Loader type="Audio" color="#fff" height={20} width={20} /> </button>
                            :
                            success === 3 && status === 1 &&
                            <button className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-1 mt-3" type="submit" onClick={()=> HandleClick(1)}>Try Again</button>

                    }
                    {success === 2 && status === 1 && 
                        <div className="alert alert-success">Your message was posted!</div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Extras;