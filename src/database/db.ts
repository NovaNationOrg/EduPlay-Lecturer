import Dexie, { type EntityTable } from "dexie";
import { Game } from "./interfaces/game";
import { JeopardyGame } from "./interfaces/jeopardy";

const db = new Dexie('EduPlayDB') as Dexie & {
    gameList: EntityTable<Game, 'gameNum'>;
    jeopardyData: EntityTable<JeopardyGame, 'id'>;

}

db.version(1).stores({
    gameList: '++gameNum, game_code, game_id, date',
    jeopardyData: '++id, category_num, game_id, [game_id+category_num], [game_id+theme], [game_id+theme+question], [game_id+theme+answer], [game_id+theme+points],question,answer,theme'
})

export { db }