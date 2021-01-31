import React from 'react'
import { Redirect } from 'react-router-dom'
import qs from 'qs'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import axios from 'axios'
import Cookies from 'js-cookie'

function Signout() {
    const[token, setToken] = React.useState(Cookies.get("token"))
    React.useEffect(() => {
        axios.post("https://thepc.herokuapp.com/api/users/logout", qs.stringify({}), {
            headers: {
                'Authorization': 'Bearer ' + Cookies.get("token")
            }
        }).then((response) => {
            Cookies.remove("id")
            Cookies.remove("name")
            Cookies.remove("token")
            Cookies.remove("onb")
            setToken("")
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    if(token !== "") {
        return (
            <div>
            <h1>Signing you out! See you soon</h1>
            <Loader type="TailSpin" color="#ff1e56" height={100} width={100} timeout={30000} />
            </div>
        )
    } else {
        return (
            <Redirect to="/" />
        )
    }

}

export default Signout;