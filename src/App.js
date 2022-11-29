import React, {useState, useEffect} from 'react';
import { StartGame } from './components/StartGame';
import { QuestionsPage } from './components/QuestionsPage';
import {nanoid} from "nanoid"

import './App.css';

function App() {

  const [startGame, setStartGame] = useState(false)
  const [dataApi, setDataApi] = useState([])
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)
  const [isCheck, setIsCheck] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [categorySelected, setCategorySelected] = useState([])
  const categoryData = {
    data:[{
      id: nanoid(), 
      categories:['Animals', 'Sports', 'Computers', 'Mathematics'],
      selected: ""
    }]
  }  
  const sortArray = (arr) => arr.sort(() => Math.random() - 0.5);
  let [url, setUrl] = useState("https://opentdb.com/api.php?amount=5")

  useEffect(() => {
    async function getDataApi(url){
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      setDataApi(() => {
        return data.results.map(newData => {
          return {
            question: newData.question,
            answers: sortArray([...newData.incorrect_answers, newData.correct_answer]),
            correct_answer: newData.correct_answer,
            id:nanoid(),
            checked: false,
            answer_selected: ''
          }
        })
      })
    }
    
    setCategorySelected(categoryData.data)
    getDataApi(url)
  }, [count])
  
  console.log(url)
  console.log(isSelected)

  function toggleGame(){
    setStartGame(prevState => !prevState)
    setCount(prevCount => !startGame ? prevCount+=1 : prevCount)
    setIsCheck(false)
  }

  function handleClickAnswer(id, answer){
    setDataApi(prevData => prevData.map( newData =>{
      return newData.id === id ? {...newData, answer_selected: answer} : newData
    }))
  }
  
  function handleCheckAnswer(){
    setDataApi(prevData => prevData.map( newData => {
      return {...newData, checked: true}
    }))

    setIsCheck(true)

    let answerScore = 0;
    dataApi.forEach(question =>{
      if(question.answer_selected === question.correct_answer){
        answerScore += 1
      } else {
        answerScore += 0
      }
    })
    setScore(answerScore)
  }

  function handleCategory(id, category){
    setCategorySelected(prevCategory => prevCategory.map( newCategory => {
      return newCategory.id === id ? {...newCategory, selected: category} : newCategory
    }))
    setIsSelected(true)


    if(isSelected){
      if(category === ''){
        setUrl("https://opentdb.com/api.php?amount=5")
      } else if(category === 'Animals'){
        setUrl("https://opentdb.com/api.php?amount=5&category=27")
      } else if (category === 'Sports'){
        setUrl("https://opentdb.com/api.php?amount=5&category=21")
      } else if(category === 'Computers'){
        setUrl("https://opentdb.com/api.php?amount=5&category=18")
      } else {
        setUrl("https://opentdb.com/api.php?amount=5&category=19")
      }
    } else {
      setUrl("https://opentdb.com/api.php?amount=5")
    }
  }

  return (
    <div className="App">
      {!startGame ? < StartGame toggleGame={toggleGame} data={categorySelected} handleCategory={handleCategory}/> : <QuestionsPage data={dataApi} toggleGame={toggleGame} handleClickAnswer={handleClickAnswer} handleCheckAnswer={handleCheckAnswer} score={score} setScore={setScore} isCheck={isCheck}/>}
    </div>
  );
}

export default App;
