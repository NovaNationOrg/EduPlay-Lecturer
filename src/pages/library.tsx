import React from "react";
import { Link } from "react-router-dom";
import "./../styles/library.css"; 
import Library from "/assets/images/bookshelf.png"
import Home from "/assets/images/house.png"
import GameList from "../components/game-list";



const GameComponent: React.FC = () => {
  sessionStorage.clear()

  return (
    <div className="container">
      <div className="header">
        <div className="topnav">
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="categories">
        <Link  to={"/csv"}>
          <button className="sidebar-button">
           Import questions
          </button>
        </Link>
  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;



        <Link to = "/PreviousGames">
          <button className="sidebar-button">
            Previous Games
          </button>
        </Link>

      </div>

      <div className="menu">
        <br />
        <hr />
                <Link  to={"/home"}>

        <img src={Home} alt="Image" width={40} height={40} />
        <p>Home</p>
        </Link>
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



