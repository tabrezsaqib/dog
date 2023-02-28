import React, {useState, useEffect} from 'react';
import './Home.css';
import {useNavigate} from "react-router-dom";
function Home() {
const [dog, setDog] = useState([]);
const [breedName, setBreedName] = useState("");
const navigate = useNavigate();
    useEffect(
        () => {
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(
            (resp) =>{return resp.json();} 
        )
        .then (
            (result) => {
                setDog(result?.message);
            }
        );
    },[]
    )

    useEffect(() => {
        if (dog){
            let name = Object.keys(dog);
            setBreedName(name);
        }
    }, [dog]

    );
  return (
    <div className='homeMain'>
        <div className='homeHeader'>
            <h2>Adopt a Dog!</h2>
            <select onChange={(e) => navigate(`/image/${e.target.value}`)} className="dropdownStyle">
                <option disabled selected>Select Breed</option>
                <option disabled></option>
                {breedName && breedName?.map((element, index) => {
                    return(
                                                        <>
                                                            <option>
                                                                {element}
                                                            </option>
                                                            <option disabled></option>
                                                        </>
                                                            );
                                                        })}

            </select>
        </div>
        <div className="homeBody"></div>
    </div>
  )
}

export default Home