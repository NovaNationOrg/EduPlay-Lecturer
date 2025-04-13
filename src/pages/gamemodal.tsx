import React from 'react';
import { Link } from "react-router-dom";
import {handleDraft} from "../components/draft-handler"
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

const GameModal: React.FC<GameModalProps> = ({ 
  isOpen, 
  onClose, 
  gameTitle, 
  gameDescription,
  category,
  time,
  gameTheme
}) => {
    
  if (!isOpen) return null;
  
  sessionStorage.setItem("current_game",gameTheme)
  return (
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
            <button className={`library-modal-button ${gameTheme}-modal-button`}>Add to Favourites</button>
          </div>
          <div className="modal-right">
            <h2
              className={`${gameTheme}-game-title`}
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
  );
};

export default GameModal;