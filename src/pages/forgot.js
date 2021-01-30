import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import axios from 'axios'
import qs from 'qs'


function Forgot() {
    const [email, setEmail] = useState("")
    function HandleChange(event) {
        const value = event.target.value
        setEmail(value)
    }

    function HandleClick(){

    }
//comment

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
                                    <div>
                                        <center>
                                            <h1> <Icon.LockFill className="mb-2 display-3" /></h1>
                                            <h1 className="login-heading mb-4">Reset Password</h1></center>
                                        <div className="form-label-group">
                                            <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" autoFocus onChange={HandleChange} />
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                        <button className="btn btn-lg btn-dark btn-block btn-login btn-blue text-uppercase font-weight-bold mb-2" onClick={HandleClick}>Reset Pass</button>
                                        <div className="form-label-group text-center">
                                            <p className="text-dark" style={{ fontFamily: "Open Sans" }}>&copy; 2020 THEPC - VIT. All Rights Reserved. <br /> v2.0.b0.1</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Forgot;