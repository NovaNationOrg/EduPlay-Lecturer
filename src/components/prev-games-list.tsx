import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../database/db';
import { PreviousGameCard } from './prev-games-card';
import "../styles/previous-games.css"
import Header from './header';


export function PreviousGamesList(){
    const games = useLiveQuery(()=> db.gameList.toArray())

    const reversedGames = (games ?? []).reverse()

    return(
        <div className="previous-games-container">
        <Header headerText='Previous Games' gameClass='generic-header' />
            <div className='previous-games-list'>
            {
            reversedGames.length 
            ?   reversedGames.map((game) => (
                    <PreviousGameCard key={game.game_id} game_code={game.game_code}
                    game_id={game.game_id} title_date={game.date}/>
                ))
            :  <h2>No games available</h2>
            }
            </div>
        </div>
       )
   }
