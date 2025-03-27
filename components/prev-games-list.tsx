import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../src/database/db';
import { PreviousGameCard } from './prev-games-card';


export function PreviousGamesList(){
    const games = useLiveQuery(()=> db.gameList
    .toArray())
    
    if(!games)
        return   
    
    const reversedGames = [...games].reverse()

    
    return(
        <div className="previous-games-container">
            <h1>Previous Games</h1>
            {reversedGames.map((game) => (
                <PreviousGameCard key={game.game_id} cardClass={game.game_code}
                game_id={game.game_id} title_date={game.date}/>
            ))}
        </div>
    )
}