import React from "react";

export const Questions = (props) => {

    const answers = props.data.answers;
    const answersElement = answers.map((answer, index) => {
        let styles;
        if(props.data.checked){
            if(props.data.correct_answer === answer){
                styles={backgroundColor: "#94D7A2"}
            } else if (props.data.answer_selected === answer){
                styles={backgroundColor: "#F8BCBC"}
            } else {
                styles={backgroundColor: "#F5F7FB"}
            }
        } else {
            styles= props.data.answer_selected === answer ? {backgroundColor:"#293264", color:"white"} : {backgroundColor:"#F5F7FB"}
        }

        return (
        <div key={index} style={styles} className= {props.data.checked ? "answers-checked" : "answers"} onClick={() => props.handleAnswer(props.data.id,answer) }>{answer}</div>
        )
    })

    return (
        <div className="questions">
            <h3>{props.data.question}</h3>
            <div className="questions-option">
                {answersElement}
            </div>
            <br/>
        </div>
    )
}