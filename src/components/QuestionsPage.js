import React from "react";
import { Questions } from "./Questions";

export const QuestionsPage = (props) => {
    function handleAnswer(id, answer){
        props.handleClickAnswer(id,answer)
    }

    const questionsElements = props.data.map((questionElement, index) => {
        return <Questions key={index} data={questionElement} handleAnswer={handleAnswer}/>
    })

    return (
        <div className="questions-page">
            <h1>Just Do Your Best Attemp</h1>
            {questionsElements}
            {!props.isCheck ? <button className="game--button" onClick={props.handleCheckAnswer}>Check Answers</button> :
            <div>
                <p>Your score is: {props.score} / {props.data.length} </p>
                <button className="game--button" onClick={props.toggleGame}>Reset Game</button>
            </div>}
        </div>
    )
}