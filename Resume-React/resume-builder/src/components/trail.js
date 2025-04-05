import React from "react";
import style from "./trail.module.css";
import resumeSvg from "../assets/resume.svg";

function trail(){
  return (
    <div className={style.container}>
        <div className={style.left}>

        {/* </div> */}
      <p className={style.heading}>
        A <span>Resume </span> that stand out!
      </p>
      <p className={style.heading}>
        Make your own resume. <span>It's free</span>
      </p>
    </div>
    <div className={style.right}>
        <img src={resumeSvg} alt="Resume" />
    </div>
    </div>
  )
}

export default trail
