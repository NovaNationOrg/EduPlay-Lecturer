import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/library.css"; 
import ImageName from "/assets/images/roleplay.png"
import Library from "/assets/images/bookshelf.png"
import Home from "/assets/images/house.png"
import GameModal from "./gamemodal"



const GameComponent: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  sessionStorage.clear()
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="topnav">
          <input type="text" placeholder="Search.." />
        </div>
      </div>

      <div className="categories">
    <span>
      <img src={ImageName} alt="Image" />
      <img src={ImageName} alt="Image" />
      <img src={ImageName} alt="Image" />
      <img src={ImageName} alt="Image" />
      <img src={ImageName} alt="Image" />
      <img src={ImageName} alt="Image" />
    </span>

      </div>

      <div className="menu">
        <Link  to={"/csv"}>
              <button className="modal-button">
                Import questions
              </button>
        </Link>
        <br />
        <br />
        <img src={Home} alt="Image" width={40} height={40} />
        <p>Home</p>
        <br />
        <img src={Library} alt="Image" />
        <p>Library</p>
        <br />
        <hr />
        <br />
        <p>Favourites</p>
      </div>

      <div className="game-container">
        <div className="game">
            <button
              onClick={openModal}
              className="jeopardy-button"
            >
              <div className="grid-item-a">
                  Jeopardy!
              </div>
          </button>

          <GameModal 
            isOpen={isModalOpen}
            onClose={closeModal}
            gameTitle="Jeopardy"
            gameDescription="This is a brief summary on the game! Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
            category="Trivia"
            time="20 mins"
            players="Unlimited"
            />

          {[...Array(15)].map((_, index) => (
            <div key={index} className="grid-item">
              <div>COMING SOON</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameComponent;



