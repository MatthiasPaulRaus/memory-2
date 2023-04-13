import {useEffect, useState} from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
import React from 'react'
import {FaFish} from "react-icons/fa"
import {FaCat} from "react-icons/fa"
import {FaDog} from "react-icons/fa"
import {FaHorse} from "react-icons/fa"
import {FaFrog} from "react-icons/fa"
import {FaSpider} from "react-icons/fa"
import {v4 as uuidv4} from "uuid"


const cardImages = [
  
{idx: uuidv4(),
id:1,
icon: <FaFish fontSize="1.5em" />, matched:false},

{idx: uuidv4(),
id:1,
icon: "Fisch", matched:false},

{idx: uuidv4(),
id:2,
icon: <FaCat fontSize="1.5em" />, matched:false},

{idx: uuidv4(),
id:2,
icon: "Katze", matched:false},

{idx: uuidv4(),
id:3,
icon: <FaDog fontSize="1.5em"/>, matched:false},

{idx: uuidv4(),
id:3,
icon: "Hund", matched:false},

{idx: uuidv4(),
id:4,
icon: <FaHorse fontSize="1.5em"/>, matched:false},

{idx: uuidv4(),
id:4,
icon: "Pferd", matched:false},

{idx: uuidv4(), 
id:5,
icon: <FaFrog fontSize="1.5em"/>, matched:false},

{idx: uuidv4(),
id:5,
icon: "Frosch", matched:false},

{idx: uuidv4(),
id:6,
icon: <FaSpider fontSize="1.5em"/>, matched:false},

{idx: uuidv4(),
id:6,
icon: "Spinne", matched:false}
]
  


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //console.log(cards)

  //handle a choice
  const handleChoice = (card) => {
   choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect(()=> {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.id === choiceTwo.id){
      setCards(prevCards => {
        return prevCards.map(card => {
         if(card.id === choiceOne.id){
          return{...card, matched: true}
         }else {
          return card
         }
        })
      })  
      resetTurn()
      }else{
      setTimeout(() => resetTurn(),1000)
      }
    }
  }, [choiceOne, choiceTwo])

  
  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }

  //start game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  //neu starten
  const restart = () => {
    window.location.reload()
  }
  
  return (
    <div className="App">
     <h2>memory-2</h2>
     <h3>Welches Wort passt zu welchem Bild?</h3>
     
      <div className="card-grid">
        {cards.map(card => (
        <SingleCard 
        key={card.idx}
        card={card}
        handleChoice = {handleChoice}
        flipped = {card === choiceOne || card === choiceTwo || card.matched}
        disabled = {disabled}
        />
        ))}
      </div>

      <h3>Versuche: {turns}</h3>
      
      {cards.every((card) => card.matched)?
      <button onClick={restart}>neu starten?</button> :null}
     
    </div>
  );
}

export default App;


