import {JSX, useState} from 'react'
import { GameMapping } from './game-mapping'
import GameModal from './library/gamemodal'




export function mapGame(gameinfo:string,game_code:string){
    const gameArray = gameinfo.split("|")
    
    const [isModalOpen, setModalOpen] = useState(false)

    console.log("asddsa")
    const closeModal = () => handleClose()
    const openModal = () => setModalOpen(true)

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
    };

    function handleClose(){
        setModalOpen(false)
        if(sessionStorage.getItem("numFavourites") == "1" && sessionStorage.getItem("removed-status")=="active"){
            window.location.reload()
            sessionStorage.removeItem("removed-status")
        }
    }


    const game_title = gameArray[0]
    const gameElement = (
        <div key={game_title + ":" + game_code} className='button-container'> 
            <button onClick={openModal} className={`library-game ${game_code}-button`}>
                <div className= {`${game_code}-grid-item`}> {game_title}! </div>
            </button>
            <GameModal isOpen={isModalOpen}onClose={closeModal} gameTitle={game_title} gameDescription={gameArray[1]} category={gameArray[2]} time={`${gameArray[3]} mins`} gameTheme= {game_code} />
        </div>
    )
    return {gameElement,handleKeyDown}
}   

interface GameListingProps{
    favouriteScreen : boolean
}

export default function GameList({favouriteScreen}:GameListingProps):JSX.Element{
    const gameListing:JSX.Element[] = []
  
    const keyList = favouriteScreen ? localStorage.getItem("favourites")?.split("|") : Object.keys(GameMapping)

    const filler = favouriteScreen ? "NOT ADDED" : "COMING SOON"
    if(favouriteScreen){
        
        const favCount = sessionStorage.getItem("numFavourites")? Number(sessionStorage.getItem("numFavourites")) : -1

        if ((favCount != -1 && keyList!=null) && (keyList.length < favCount)){
            window.location.reload()
            sessionStorage.removeItem("removed-status")
        }
            sessionStorage.setItem("numFavourites", keyList?.length.toString()!)
    }

    let i=0
    
    if (keyList && keyList[0] != "")
        while(i < keyList.length){
            const gameKey = keyList[i] as keyof typeof GameMapping
            const gameElement= mapGame(GameMapping[gameKey],gameKey)
            gameListing.push(gameElement.gameElement)
            i++
        }
   
    
    const fillerCards = [...Array(16-i)].map((_, index) => (
        <div key={index} className="grid-item">
          <div>{filler}</div>
        </div>
      ))

    return keyList ? <>{gameListing.concat(fillerCards)}</> : <>{fillerCards}</>

}