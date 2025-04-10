import {JSX, useState} from 'react'
import { GameMapping } from './game-mapping'
import GameModal from '../pages/gamemodal'

// export default function prepareGameList(){
//     const gameListing = gameList()
//     return gameListing
    
// }



function mapGame(gameinfo:string,game_code:string){
    const gameArray = gameinfo.split("|")
    const [isModalOpen, setModalOpen] = useState(false)
    
    const closeModal = () => handleClose()
    const openModal = () => setModalOpen(true)

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
    };

    function handleClose(){
        setModalOpen(false)
        sessionStorage.removeItem("current_game")
    }


    const game_title = gameArray[0]
    const gameElement = (
        <div key={game_title + ":" + game_code} className='button-container'> 
            <button onClick={openModal} className={`${game_code}-button`}>
            <div className= {`${game_code}-grid-item`}> {game_title}! </div>
            </button>
            <GameModal isOpen={isModalOpen}onClose={closeModal} gameTitle={game_title} gameDescription={gameArray[1]} category={gameArray[2]} time={`${gameArray[3]} mins`} gameTheme= {game_code} />
        </div>
    )
    return {gameElement,handleKeyDown}
}   


export default function GameList(){
    const gameListing:JSX.Element[] = []
   
  
    const keyList = Object.keys(GameMapping)

    let i=0
    while(i < keyList.length){
        const gameKey = keyList[i] as keyof typeof GameMapping
        const gameElement= mapGame(GameMapping[gameKey],gameKey)
        gameListing.push(gameElement.gameElement)
        i++
    }
   

    const comingSoon = [...Array(16-i)].map((_, index) => (
        <div key={index} className="grid-item">
          <div>COMING SOON</div>
        </div>
      ))

    return gameListing.concat(comingSoon)

}