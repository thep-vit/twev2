import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import md5 from 'md5'
import _ from "lodash"
import Cookies from 'js-cookie'
import {LockFill} from 'react-bootstrap-icons'

function UserForm(props) {
    const [err, setErr] = useState("Error")
    const [logInfo, setLogInfo] = useState({
        email: "",
        password: ""
    });
    const [regInfo, setRegInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirm: ""
    })
    const [success, setSuccess] = useState(0)
    function HandleChange(event) {
        const name = event.target.name;
        const value = event.target.value
        if (props.type === "login") {
            setLogInfo((previous) => {
                return {
                    ...previous,
                    [name]: value
                }
            })
        } else if (props.type === "register") {
            setRegInfo((previous) => {
                return {
                    ...previous,
                    [name]: value
                }
            })
        }
    }

    function SaveCredentials(id, name, token, onboarded) {
        Cookies.set("id", id)
        Cookies.set("name", name)
        Cookies.set("token", token)
        Cookies.set("onb", onboarded)
    }

    function HandleClick(event) {
        setSuccess(1)
        event.preventDefault()
        if (props.type === "register") {
            regInfo.password = md5(regInfo.password)
            axios.post("https://thepc.herokuapp.com/api/users/signup", qs.stringify(regInfo), {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                if (response.status === 201) {
                    console.log(response.data);
                    SaveCredentials(response.data.newUser._id, response.data.newUser.name, response.data.token, response.data.newUser.onboarding)
                    setSuccess(2)
                }
                if (response.status === 400) {
                    setSuccess(3)   
                    setErr(err.body.message)
                }
            }).catch(err => {
                console.log(err);
                setSuccess(3)               })
        } else if (props.type === "login") {
            logInfo.password = md5(logInfo.password)
            console.log(logInfo);
            axios.post("https://thepc.herokuapp.com/api/users/login", qs.stringify(logInfo), {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log(response.data);
                    SaveCredentials(response.data.userFound._id, response.data.userFound.name, response.data.token, response.data.userFound.onboarding)
                    setSuccess(2)
                }
                if (response.status === 400) {
                    setSuccess(3)   
                    console.log(response);
                    setErr(response.body.errorMessage)
                }
            }).catch(err => {
                    setSuccess(3)
                    console.log(err);
            })
        }

    }
    if (success === 2) {
        return <Redirect to="/dashboard" />
    } else {
        return (
            <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
                    </div>
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        {props.type === "login" &&
                                            <>
                                            <h1> <LockFill className="mb-2 display-4" /></h1>
                                                <h1 className="login-heading mb-4"><strong>{logInfo.email ? _.truncate(logInfo.email,{'separator': /@/, 'length': 18}) : "Hey, it's you again!"}</strong></h1>                                                {success === 200 && <h4 className="text-success mb-4">Sign in successful! {logInfo.email}</h4>}
                                                <form>
                                                    <div className="form-label-group">
                                                        <input type="email" name="email" id="inputEmailLogin" className="form-control" placeholder="Email address" autoFocus onChange={HandleChange} />
                                                        <label htmlFor="inputEmailLogin">Email address</label>
                                                    </div>

                                                    <div className="form-label-group">
                                                        <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" onChange={HandleChange} />
                                                        <label htmlFor="inputPassword">Password</label>
                                                    </div>
                                                    {success === 0 ?
                                                        <button className="btn btn-lg btn-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2" type="submit" onClick={HandleClick}>Sign in</button>
                                                        : success === 1 ?
                                                            <button className="btn btn-lg btn-outline-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2" type="submit" onClick={HandleClick}><Loader type="Audio" color="#fff" height={20} width={20} /> </button>
                                                            :
                                                            success === 3 &&
                                                            <button className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" onClick={HandleClick}>Try Again</button>

                                                    }                                                <div className="text-center">
                                                        <a className="small" href={"/register"}>Create an account!</a>

                                                    </div>
                                                    {success === 3 && 
                                                        <div className="alert alert-danger">{err}</div>
                                                    }
                                                    <div className="form-label-group text-center">
                                                    
                                                    <p className="text-dark" style={{fontFamily: "Open Sans"}}>&copy; 2020 THEPC - VIT. All Rights Reserved. <br /> v2.0.b0.1</p>

                                                    </div>
                                                </form>
                                            </>
                                        }
                                        {props.type === "register" &&
                                            <>
                                                <h1 className="login-heading mb-4"><strong>Nice to meet you{regInfo.name && ", " + regInfo.name}!</strong></h1>
                                                <h4 className="login-heading mb-4">Create an account to get started</h4>
                                                <form>
                                                    <div className="form-label-group">
                                                        <input type="text" name="name" id="inputName" className="form-control" placeholder="Name" autoFocus onChange={HandleChange} />
                                                        <label htmlFor="inputName">Name</label>
                                                    </div>
                                                    <div className="form-label-group">
                                                        <input type="email" name="email" id="inputEmailLogin" className="form-control" placeholder="Email address" onChange={HandleChange} />
                                                        <label htmlFor="inputEmailLogin">Email address</label>
                                                    </div>

                                                    <div className="form-label-group">
                                                        <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" onChange={HandleChange} />
                                                        <label htmlFor="inputPassword">Password</label>
                                                    </div>
                                                    <div className="form-label-group">
                                                        <input type="password" name="confirm" id="inputPasswordCnf" className="form-control" placeholder="Confirm Password" onChange={HandleChange} />
                                                        <label htmlFor="inputPasswordCnf">Confirm Password</label>
                                                    </div>

                                                    {success === 0 ?
                                                        <button className="btn btn-lg btn-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2" type="submit" onClick={HandleClick}>Create Account</button>
                                                        : success === 1 ?
                                                        <button className="btn btn-lg btn-outline-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2" type="submit" onClick={HandleClick}><Loader type="Audio" color="#fff" height={20} width={20} /> </button>
                                                            :
                                                            success === 3 &&
                                                            <button className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" onClick={HandleClick}>Try Again</button>

                                                    }

                                                    <div className="text-center">
                                                        <a className="small" href={"/login"}>Sign In to existing account!</a>
                                                        <p className="text-dark" style={{fontFamily: "Open Sans"}}>&copy; 2020 THEPC - VIT. All Rights Reserved. <br /> v2.0.b0.1</p>

                                                    </div>
                                                </form>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>

        )
    }
}

export default UserForm