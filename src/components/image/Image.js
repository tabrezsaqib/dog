import React, {useState, useEffect} from 'react';
import './Image.css';
import {NavLink, useParams} from "react-router-dom";
import Loader from '../loader/Loader';
function Image() {
    const params = useParams();
    console.log("ppppp", params?.breed);
    const [images, setImages] = useState([]);
    useEffect(
        () => {
            fetch(`https://dog.ceo/api/breed/${params?.name}/images`)
            .then(
                (resp) => {
                    return resp.json();
                }
            )
            .then(
                (result) => {
                    setImages(result.message);
                }
            );
        },[params?.name]   
    ); 
  return (
    <div className='imagePage'>
          {images.length<=0?<Loader/>:(<>
                          <div className="detailHeader">
                                          <NavLink className="link" to="/">Back</NavLink>
                                          <h2>{params?.name}</h2>
                          </div> 
                          <div className="detailBody">
                            {images &&
                              images.map((element) => {
                                return (
                                  <div className="card">
                                    <div className="dogImg">
                                      <img src={element} alt="Logo" width="100%" height="100%" />
                                    </div>
                                    <div className="container">
                                      <button>Adopt Me</button>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                          </>
      )}
      {/* <div className="detailHeader">
        <NavLink to="/">Back</NavLink>
        <h2>{params?.name}</h2>
      </div>
      <div className="detailBody">
        {images &&
          images.map((element) => {
            return (
              <div className="card">
                <div className="dogImg">
                  <img src={element} alt="Logo" width="100%" height="100%" />
                </div>
                <div className="container">
                  <button>Adopt Me</button>
                </div>
              </div>
            );
          })}
      </div> */}
    </div>
  )
}

export default Image;