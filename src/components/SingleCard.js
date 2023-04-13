import React from 'react'
import './SingleCard.css'
import {FaBrain}from "react-icons/fa"


export default function SingleCard({ card, handleChoice, flipped, disabled }) {

const handleClick = () => {
  if(!disabled) {
    handleChoice(card)
  }}

  return (
    <div className="card" > 
      <div className = {flipped ? "flipped" : ""}>
        <section className="front" > {card.icon} </section>
        <section className="back" 
        onClick={handleClick}>{<FaBrain fontSize="1.5em"/>}</section>
      </div>
    </div> 
  )
}
