import React, {useState, useEffect} from 'react';
import "./Description.css";
import {NavLink, useParams, useLocation} from "react-router-dom";



function Description() {
  const breed = useParams();
  let result = useLocation();
    // const { state } = useLocation();
    // console.log("lll",result.state);
  return (
    <div>
      <div className="descriptionHeader">
                                          <NavLink className="link" to={`/image/${breed?.name}`}>Back</NavLink>
                                          <h2>{breed?.name}</h2>
      </div>
      <div className='descriptionBody'>
        <div className='descriptionImgContainer'>
          <div className="descriptionImg">
            <img src={result.state.imageName} alt="Logo" width="100%" height="100%"/>
          </div>
        </div>
        <div className='descriptionContent'>
          <p><span className='spanTitle'>Breed Name: </span>{breed?.name}</p>
          <p><span className='spanTitle'>Status: </span>Vaccinated</p>
          <p><span className='spanTitle'>Age: </span> 2 months</p>
          <h4 className='title'>Thanks for choosing me!</h4>
          <h4 className='title'>Please visit us at our centre for further processing and details.</h4>
        </div>
      </div>
    </div>
  )
}

export default Description