import { Link } from "react-router-dom";
import "./../styles/library.css"; 
import GameList from "../components/game-list";
import HomeMenu from "./../components/home-menu";
import { motion } from "framer-motion"


interface GameLibraryProps{
    favoriteScreen:boolean
}
function GameLibrary({favoriteScreen}:GameLibraryProps) {
    sessionStorage.clear()
    
    return (
      <motion.div className="container"
   
       initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
       transition={{ duration: 0.75, ease: "backOut" , type:"tween"}}
      >
       
  
        
     
      <div className="menu">
        <HomeMenu/>
      </div>
  
   <div className="main-content-area">
      <div className="header">
          <div className="topnav">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
  
      <div className="main-library-area">
        <div className="sub-menu">
          <div className="sub-menu-buttons">
          <Link  to={"/csv"}>
            <button className="sub-menu-button">
             Import questions
            </button>
          </Link>
          <Link to = "/PreviousGames">
            <button className="sub-menu-button">
              Previous Games
            </button>
          </Link>
          </div>
        </div>
  
        <div className="game-container">
          <div className="game">
            <GameList favouriteScreen={favoriteScreen} />
          </div>
        </div>
        </div>
        </div>
      </motion.div>
      
    );
  };
  
  export default GameLibrary;