import React from "react";
import './default.css';
import {TbLayoutGridAdd} from 'react-icons/tb'

const Def=()=>{

    return(
        <div className="onsc">
            <div>
            <TbLayoutGridAdd  className="plusbtn" size="100px"/>
            </div>

           <h1 className="def-h1">Create or Open a project.</h1>
        </div>
        );
}

export default Def;