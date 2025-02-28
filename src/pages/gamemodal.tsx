import React from 'react';
import { Link } from "react-router-dom";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  gameDescription: string;
  category: string;
  time: string;
  players: string;
}

const GameModal: React.FC<GameModalProps> = ({ 
  isOpen, 
  onClose, 
  gameTitle, 
  gameDescription,
  category,
  time,
  players
}) => {
    
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-content">
          <div className="modal-left">
            <Link  to={"/jeopardy"}>
              <button className="modal-button">
                Play Now
              </button>
            </Link>
            <button className="modal-button">Add to Favourites</button>
          </div>
          <div className="modal-right">
            <h2
              className="game-title"
              style={{ fontSize: "30px", fontFamily: "Fontdiner Swanky" }}
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
                <span>{players}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;