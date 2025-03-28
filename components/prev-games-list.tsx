import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../src/database/db';
import { PreviousGameCard } from './prev-games-card';


export function PreviousGamesList(){
    const games = useLiveQuery(()=> db.gameList
    .toArray())
    
    if(!games)
        return   
    
    const reversedGames = [...games].reverse()

    if (reversedGames.length === 0) {
        return (
            <>
                <h1>Previous Games</h1>
                <h2>No games available</h2>
            </>
        )
    } else {
    return(
        <div className="previous-games-container">
            <h1>Previous Games</h1>
            {reversedGames.map((game) => (
                <PreviousGameCard key={game.game_id} game_code={game.game_code}
                game_id={game.game_id} title_date={game.date}/>
            ))}
        </div>
    )
}}