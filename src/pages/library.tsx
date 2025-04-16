import React from "react";
import { Link } from "react-router-dom";
import "./../styles/library.css"; 
import GameList from "../components/game-list";
import HomeMenu from "./../components/home-menu";
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
        <HomeMenu/>
      </div>

      <div className="game-container">
        <div className="game">
          <GameList favouriteScreen={false} />
        </div>
      </div>
    </motion.div>
  );
};

export default GameComponent;



