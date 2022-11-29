import React from "react";
import { Categories } from "./Categories";

export const StartGame = (props) => {

    const categories = props.data.map( (category, index) => {
        return <Categories key={index} data={category} handleCategory={props.handleCategory}/>
    })
    console.log(categories)

    return (
        <div className="start-game-page">
            <div className="circle-right"></div>
            <h1 className="start-game--title">Quizzical</h1>
            <p className="start-game--subtitle">Welcome to the Quizzical Api App!! Let's start to play!!</p>
            {categories}
            <p>If you don't select a category, you'll get random questions!!</p>
            <button className="game--button" onClick={props.toggleGame}>Start Game</button>
            <div className="circle-left" ></div>
        </div>
    )
} 