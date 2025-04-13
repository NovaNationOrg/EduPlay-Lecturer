import React from "react";
import { Link } from "react-router-dom";
import "./../styles/library.css"; 
import ImageName from "/assets/images/roleplay.png"
import Library from "/assets/images/bookshelf.png"
import Home from "/assets/images/house.png"
import GameList from "../components/game-list";



const GameComponent: React.FC = () => {
  sessionStorage.clear()

 

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
              <button className="sidebar-button">
                Import questions
              </button>
        </Link>
        <br/>
        <br/>
        <Link to = "/PreviousGames">
              <button className="sidebar-button">
                Previous Games
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
          <GameList />
        </div>
      </div>
    </div>
  );
};

export default GameComponent;



