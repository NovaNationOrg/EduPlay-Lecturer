import Dexie, { type EntityTable } from "dexie";
import { Game } from "./interfaces/game";
import { JeopardyGame } from "./interfaces/jeopardy";
import { HMCategoryListIntf } from "./interfaces/hangman/hangman-category-list";
import { HMCategoryItemIntf } from "./interfaces/hangman/hangman-category-item";

const db = new Dexie('EduPlayDB') as Dexie & {
    gameList: EntityTable<Game, 'gameNum'>;
    jeopardyData: EntityTable<JeopardyGame, 'id'>;

    hangmanCategories: EntityTable<HMCategoryListIntf, 'id'>
    hangmanItems: EntityTable<HMCategoryItemIntf, 'id'>
}

db.version(1).stores({
    gameList: '++gameNum, game_code, game_id, date',
    jeopardyData: '++id, category_num, game_id, [game_id+category_num], [game_id+theme], [game_id+theme+question], [game_id+theme+answer], [game_id+theme+points],question,answer,theme',
    hangmanCategories: "++id, game_id,category_number",
    hangmanItems: "++id, [category_id+category_number]"
})

export { db }