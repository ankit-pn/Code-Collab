import React from "react";
import './featureCard.css';

const Fcard=(props)=>{
   const classes= 'Card '+ props.className;
   return <div className={classes}>{props.children}</div>
}

export default Fcard;