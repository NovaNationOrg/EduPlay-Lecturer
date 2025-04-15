import "./../styles/home.css"; 
import { Link } from "react-router-dom";
import Library from "/assets/images/bookshelf.png"
import Home from "/assets/images/house.png"
import { motion } from "framer-motion"
import { mapGame } from "../components/game-list";
import { GameMapping } from "../components/game-mapping";
import { useEffect, useState } from "react";


function getFeaturedGame(featuredGame:number){

    const keyList = Object.keys(GameMapping)
    const gameKey = keyList[featuredGame] as keyof typeof GameMapping
    const gameElement = mapGame(GameMapping[gameKey],gameKey)
    return (gameElement.gameElement)
}
const HomeComponent: React.FC = () => {
  sessionStorage.clear()
  const [featuredGame,updatedFeaturedGame] = useState<number>(0)

 
  useEffect(()=>{
    const gameCount = Object.keys(GameMapping).length
    updatedFeaturedGame(Math.floor(Math.random() * gameCount))
  },[])
 

 
  return (
    <motion.div 
    className="home-container"  
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
     transition={{ duration: 0.75, ease: "backOut" , bounce:1, bounceStiffness: 10}}
    >
      <div className="home-header">
        <div className="home-topnav">
            <h1> EduPlay </h1>
        </div>
      </div>

      <div className="home-categories">

        <h2>  Welcome to EduPlay! </h2>
        <hr></hr>
        <br/>
        <p> EduPlay was built by a group of final year students, with the guidance of our great supervisors. 
            We hope you enjoy your time here</p>
        <hr></hr>
        <br/>
        <p> Regards,</p>
        <p> The EduPlay team</p>

      </div>

      <div className="home-menu">
        <br />
        <hr />
        
        <img src={Home} alt="Image" width={40} height={40} />
        <p>Home</p>
        <br />
        <Link  to={"/Library"}>
        <img src={Library} alt="Image" />
        <p>Library</p>
        </Link>
        <br />
        <hr />
        <br />
        <p>Favourites</p>
      </div>
      <div className="home-featured">
        <div className="home">
            <h2> Featured Game: </h2>
            <div className="featured-game">
            {getFeaturedGame(featuredGame)}  
            </div>
        </div>
      </div>
</motion.div>
  );
};

export default HomeComponent;



