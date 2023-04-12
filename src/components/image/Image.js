import React, {useState, useEffect} from 'react';
import './Image.css';
import {NavLink, useParams, useNavigate} from "react-router-dom";
import Loader from '../loader/Loader';
function Image() {
    const params = useParams();
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const [imageObj, setImageObj] = useState({});
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
    console.log("iii",images);
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
                                      <img src={element} alt="Logo" width="100%" height="100%" 
                                      // onClick={() => {alert(element)}}
                                      />
                                    </div>
                                    <NavLink className="nextLink" 
                                    to={`/description/${params?.name}`} 
                                    state={{data: "Hound", imageName: element }}
                                    >
                                      <div className="container">
                                          <button>
                                            Adopt Me
                                          </button>
                                      </div>
                                    </NavLink>
                                  </div>
                                );
                              })}
                          </div>
                          </>
      )}
    </div>
  )
}

export default Image;