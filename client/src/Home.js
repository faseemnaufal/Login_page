import React from "react";
// import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Login from "./Login";

function Home(){

    // const access = localStorage.getItem("accessToken");
    // console.log("access", access)

    // const refresh = localStorage.getItem("refreshToken");
    // console.log("refresh", refresh)

    // const details = 'http://localhost:3500/home'
    // const headers = {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${access}`,
    //   };

    // const [data, setData] = useState([]);
    //     useEffect(() => {
    //         axios
    //         .get(details, {
    //             headers: headers,
    //         })
    //         .then((response) => {
    //             setData(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     }, [data]);

    const [data, setData] = useState([])

    useEffect(() => {
        getHome()
    }, [])

    const getHome = () => {
        const token = localStorage.getItem("jsonwebtoken");
        const headers = {
            // "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };
    
        const username = localStorage.getItem('username');
    
        axios.get(`http://localhost:3500/home/${username}`, {
            headers: headers,
        })
        .then(response => {
            setData(response.data);
        })
        .catch(error => console.log(error));
    }
    
    return(
        <>
            <h2>Welcome to Home Page</h2>
            <br />
            {/* <Users /> */}
        </>
    )
}

export default Home;


