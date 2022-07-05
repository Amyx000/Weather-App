import React, { useState, useEffect } from "react";
import "./App.css";
import audio from "./wind.mp3";


function App (){
 new Audio(audio).play();
 useEffect(() => {
  const interval = setInterval(() => {
    new Audio(audio).play();
  }, 26000);
  return () => clearInterval(interval);
}, []);
  
  const[tempclass, SetTempclass]=useState("")
  const[data,SetData]=useState({})
  const[location,SetLocation]=useState("")
  const API_KEY = process.env.REACT_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
  
  function chnglocation(event){
    SetLocation(event.target.value);
  }

  const search = (event)=> {
    if (event.key === "Enter"){
      fetch(url)
      .then(res => res.json())
      .then((result) =>{
        SetData(result);
        SetTempclass("temporary");
      });
    }
  }
  

return(
  <>
  <div className="body2">
    <h1 className="heading"><br/>Instant Weather</h1>
    <input className="searchbar" type="text" value={location} onChange={chnglocation} placeholder="City Name?" onKeyPress={search}></input>
    <div className="container">
      <h2 className={tempclass}>Hello :)<br/>Search your City</h2>
      <h2>{data.name}</h2>
      {data.main?<h3>{data.main.temp} °C</h3>:null}
      {data.weather?<h3>{data.weather[0].description}</h3>:null}
      </div>
  </div>
  <div className="block"></div>
  <div className="footer">Ⓒ 2022 Arman Kazi</div>
  </>
)
  
}


export default App;
