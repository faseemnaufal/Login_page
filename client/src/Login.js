import {Avatar, Grid, Paper, TextField} from "@mui/material"
import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from 'react'
import { setAuthenticationHeader } from './utils/authenticate'



const Login = (props) =>{

  const login = 'http://localhost:3500/login'

    const paperStyle={padding:20, height:"70vh", width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:"rgb(25 118 210)"}
    const btnStyle={margin:"8px 0"}
    const [data, setData] = useState({
      username: "",
      password: "",
    });
    const validationSchema=Yup.object().shape({
        username:Yup.string().email("please enter valid email").required("Required"),
        password:Yup.string().required("Required")
    })

    const handleChange = (e) => {
      const value = e.target.value;
      setData({
        ...data,
        [e.target.name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        username: data.username,
        password: data.password,
      };
      axios.post(login, userData)
        .then((response) => {
          if (response.status === 200) {
            
            const token = response.data.token
            localStorage.setItem('jsonwebtoken', token)
            // set default headers 
            setAuthenticationHeader(token) 
            //console.log(response.status);
            console.log(response.data);
            // console.log("access", response.data["access"]);
            // console.log("refresh", response.data["refresh"]);
            // console.log("local storage", localStorage.getItem("access"));
            window.location.href = "/home";
            localStorage.setItem('username', data.username)            
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
            setErrors(true);
            setErrorMsg(error.response.data.detail);
  
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        });
    };

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                <h2>Log in</h2>
                </Grid>
                <Formik validationSchema={validationSchema} >
                    {(props)=>(
                        <Form>
                            <Field as={TextField} label="Username"
                              variant="outlined"
                              color="primary"
                              margin="normal"
                              required
                              fullWidth
                              id="username"
                              name="username" 
                              value={data.username}
                              onChange={handleChange}
                              autoComplete="username"
                              helperText={<ErrorMessage name="username"/>}
                            />
                            <Field as={TextField} label="Password"
                              type={"password"}
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="password"
                              name="password" 
                              value={data.password}
                              onChange={handleChange}
                              autoComplete="password"
                              helperText={<ErrorMessage name="password"/>}
                            />
                            <Button type="submit" style={btnStyle} onClick={handleSubmit} variant="contained" color="primary" fullWidth
                            disabled={props.isSubmitting}>{props.isSubmitting?"Loading":"Log in"}</Button>
        
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Login;
