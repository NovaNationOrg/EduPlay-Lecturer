import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {handleDraft} from "../draft-handler"
import {AnimatePresence, motion} from 'framer-motion'
import {toast} from "sonner"


interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  gameDescription: string;
  category: string;
  time: string;
  gameTheme: string;
}

function setGameCode(){
  const game_code = sessionStorage.getItem("current_game")
  handleDraft(game_code!)
  sessionStorage.removeItem("current_game")

}

function isFavourite(){
  const game_code = sessionStorage.getItem("current_game")
  const regex = new RegExp(game_code!)

  const favouritesList = localStorage.getItem("favourites") ? localStorage.getItem("favourites") : "";

  return favouritesList!.search(regex) > -1 ? true : false
}

function handleFavorites() {
  const game_code = sessionStorage.getItem("current_game")
  const favouritesList = localStorage.getItem("favourites") ? localStorage.getItem("favourites")! : "";
  let newFavouritesList
  if (!favouritesList.includes(game_code!)) {
    newFavouritesList = favouritesList == "" ? favouritesList + game_code : favouritesList + "|" + game_code;
    toast.success("Game add to favourites", {id: "added-favourites-toast"})
  } else {
    
    newFavouritesList = favouritesList == favouritesList.replace(new RegExp("\\|"+game_code!), "") ? favouritesList.replace(new RegExp(game_code!+"\\|"), "") : favouritesList.replace(new RegExp("\\|"+game_code), "")
    newFavouritesList = favouritesList == newFavouritesList ? favouritesList.replace(new RegExp(game_code!),""): newFavouritesList
    toast.error("Game removed from favourites", {id: "removed-favourites-toast"})
    sessionStorage.setItem("removed-status","active")
  }
  localStorage.setItem("favourites", newFavouritesList);
}

const GameModal: React.FC<GameModalProps> = ({ 
  isOpen, 
  onClose, 
  gameTitle, 
  gameDescription,
  category,
  time,
  gameTheme
}) => {
  
  const [refresh,triggerRefresh] = useState(false)
  
  if (!isOpen) return null;

  function udpateStatus(){
    handleFavorites()
    triggerRefresh(!refresh)
  }
  
  sessionStorage.setItem("current_game",gameTheme)
  return (
      <AnimatePresence mode="wait">
          <motion.div 
           initial={{ opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           exit={{opacity: 1}}
           transition={{ duration: 0.5, ease: "backOut" , type:"tween"}}
          >

    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-content">
          <div className={`library-modal-left ${gameTheme}-modal-left`}>
            <Link  to={`/${gameTitle.toLowerCase()}`}>
              <button className={`library-modal-button ${gameTheme}-modal-button`} onClick={setGameCode}>
                Play Now
              </button>
            </Link>
            {isFavourite() ? 
              <button className={`library-modal-button ${gameTheme}-modal-button`} onClick={ udpateStatus }>Remove from Favourites</button> : 
              <button className={`library-modal-button ${gameTheme}-modal-button`} onClick={ udpateStatus }>Add to Favourites</button>
            }
          </div>
          <div className="modal-right">
            <h2
              className={`game-title ${gameTheme}-game-title`}
            >
              {gameTitle}
            </h2>
            <p className="game-description">
              {gameDescription}
            </p>
            <div className="game-meta">
              <div className="meta-item">
                <span className="meta-icon">&#10067;</span>
                <span>{category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">&#9203;</span>
                <span>{time}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">&#128101;</span>
                <span>Unlimited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
    </AnimatePresence>
  );
};

export default GameModal;