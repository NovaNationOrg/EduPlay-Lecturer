import React from "react";
import { Link } from "react-router-dom";
import "./../styles/library.css"; 
import Library from "/assets/images/bookshelf.png"
import Home from "/assets/images/house.png"
import GameList from "../components/game-list";
import { motion } from "framer-motion"




const GameComponent: React.FC = () => {
  sessionStorage.clear()

  return (
    <motion.div className="container"
 
     initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
     transition={{ duration: 0.75, ease: "backOut" , type:"tween"}}
    >
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
        <Link  to={"/"}>

        <img src={Home} alt="Image" width={40} height={40} />
        <p>Home</p>
        </Link>
        <br />
        <Link to ={"/library"}>
        <img src={Library} alt="Image" />
        <p>Library</p>
        </Link>
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
    </motion.div>
  );
};

export default GameComponent;



