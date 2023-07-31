
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import React, { useRef, useState, useEffect } from 'react'
import Home from '../../Components/Home/Home'
import axios from 'axios';
import "./list.css"
import Test from '../../Video/test';
import Type from '../../Video/Type';
import cities from '../../Video/cities';
import { useLocation,useNavigate } from "react-router-dom";
import HomeDisplay from './HomeDisplay';
const ListDisplayAudio = () => {
    const { search } = useLocation();
    const [city, setCity] = useState("");
    const [category, setCategory] = useState([]);
    const listRef = useRef();
    const [slideNumber, setslideNumber] = useState(0);
    const [Vid, setVid] = useState([{}]);
    const [isMoved, setisMoved] = useState(false);
    
    const handleClick = (direction) => {
        setisMoved(true);
        const distance = listRef.current.getBoundingClientRect().x - 150;
        if (direction == "left" && slideNumber >= 0) {
            setslideNumber(slideNumber - 1);


            listRef.current.style.transform = `translateX(${distance + 500}px)`
        }
        if (direction == "right" && slideNumber < 8) {
            setslideNumber(slideNumber + 1);


            listRef.current.style.transform = `translateX(${-225 + distance}px)`
        }
    }




    useEffect(() => {
        const fetchVideo = async () => {
            try {
                console.log("called")

                const res = await axios.get(
                    "http://localhost:5000/api/audio" +  search


                );
                const val = { ...res.data };

                //check now
                setVid(res.data);
                console.log(Vid)

            } catch (e) {
                console.log(e)

            }

        };
        fetchVideo();
    },[Vid],[search]);




    let navigate = useNavigate();
    const cityfilter = () => {
        navigate(`?city=${city}`)
    }
    const handleCallback = (childData) => {
        setCity(childData)

        console.log(city)
    }
    const domainfilter = () => {
        navigate(`?cat=${category[0]}`)
    }
    const handleTestCallback = (childData) => {


        setCategory(childData)

        console.log(category)
    }
    return (
        <div className="wrapper-container">
            {/* <ArrowBackIosOutlined className="ArrowSliderLeft" onClick={() => handleClick("left")} style={{ display: !isMoved && "none" }} /> */}
            <div className="title-container">
                <div className="filter">
                    <Test parentTestCallback={handleTestCallback} />
                    <button onClick={domainfilter} className="btn btn-danger">Apply</button>
                    <Type iteams={cities} parentCallback={handleCallback} />
                    <button onClick={cityfilter} className="btn btn-danger">Apply</button>
                </div>

            </div>
            <div className='mainDisplayWrapper' ref={listRef}>
                {Vid.map((vid, indx) => {
                    return (
                        <>

                            <HomeDisplay index={indx} url={vid.audio} img={vid.Poster} title={vid.title} desc={vid.desc}  city={vid.city} date={vid.createdAt} username={vid.username} />



                        </>
                    )
                })}

            </div>
            {/* <ArrowForwardIosOutlined className="ArrowSliderRight" onClick={() => handleClick("right")} /> */}
        </div>
    )
}

export default ListDisplayAudio
