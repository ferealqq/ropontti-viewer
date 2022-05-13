import React, { useState, useEffect } from "react";
import lista from "../assets/kauppalistat.json";
import osoite from "../assets/osoitteet.json";
import nimet from "../assets/nimet.json";
import songs from "../assets/songs.json";


const handleClick = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
}
const Modal = (props) => {
    const [order, SetOrder] = useState(null);
    const [destination, SetDestination] = useState(null);
    const [name, SetName] = useState(null);
    const [song, SetSong] = useState(null);
    useEffect(() => {
        SetOrder(lista.lista[(Math.floor(Math.random() * Object.keys(lista.lista).length))]);
        SetDestination(osoite.osoite[Math.floor(Math.random() * Object.keys(osoite.osoite).length)]);
        SetName(nimet.names[Math.floor(Math.random() * Object.keys(nimet.names).length)]);
        SetSong(songs.songs[Math.floor(Math.random() * Object.keys(songs.songs).length)]);

    },[]);
    
    // console.log(order);
    // console.log(destination);
    // console.log(name);
    // console.log(song);
    if(order === null || destination === null || name === null || song === null){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <div>
            Nimi: {name} <br />
            Osoite: {destination}  <br />
            Biisi: {song} <br />
            Tilaus: {order.map((item) => {
                return (
                    <div key={item}>
                        {item}
                    </div>
                )
            })}
            <button onClick={handleClick()}>
                Avaa stream
            </button>
        </div>
    )
}

export default Modal;