import React, { Component, useState } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import SignUpForm from '../../MyPages/SignUpForm'
import SignInForm from '../../MyPages/SignInForm'

import Tw from "./typewr";
import "./App1.css";
import Card from "./Card";


const Auth=(props)=>  {
  
  const [show , setShow] = useState(props.show || 'login')


    return (
        <div className="App">
          <div className="appAside" >
            
           <Tw/>
          <Card >
           <h1>
           A real-time code editor platform that enables developers to collaborate on a piece of code simultaneously, with changes being reflected in real-time on all connected devices.This platform often come with a range of tools and features to make coding easier, such as syntax highlighting, dynamic fontSize , saving changes,change theme .
           </h1>
           </Card>
          </div>
          
          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink
                
                className={`formTitleLink ${show === 'login' ? 'formTitleLink-active' : '' }`}
                onClick={()=>setShow('login')}
              >
                Sign In
              </NavLink>
              <NavLink
                
                className={`formTitleLink ${show !== 'login' ? 'formTitleLink-active' : '' }`}
                onClick={()=>setShow('register')}
              >
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink
                to="/auth/login"
               
                className={`formTitleLink ${show === 'login' ? 'formTitleLink-active' : '' }`}
                onClick={()=>setShow('login')}
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                
                to="/auth/register"
    
                className={`formTitleLink ${show !== 'login' ? 'formTitleLink-active' : '' }`}
                onClick={()=>setShow('register')}
              >
                Sign Up
              </NavLink>
            </div>

            {show === 'login' ? <SignInForm setShow={setShow}/> : <SignUpForm setShow={setShow}/>}

          </div>
        </div>
    );
  
}

export default Auth;