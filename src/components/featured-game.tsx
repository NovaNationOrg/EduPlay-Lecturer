import { JSX, useState } from "react"
import { mapGame } from "./game-list"
import { GameMapping } from "./game-mapping"

function getFeaturedGame(){

    const keyList = Object.keys(GameMapping)
    const randNum = Math.floor(Math.random() * keyList.length)
    const gameKey = keyList[randNum] as keyof typeof GameMapping
    const gameElement = mapGame(GameMapping[gameKey],gameKey)
    return (gameElement.gameElement)
}

export default function FeaturedGame(){
      const[featuredGame,setFeaturedGame] = useState<JSX.Element>(getFeaturedGame())

      return featuredGame
    
}
