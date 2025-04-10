import { Route } from 'react-router-dom'
import Jeopardy from '../pages/games/jeopardy'
import Hangman from '../pages/games/hangman'




export default[
    <Route key = "Jeopardy"path="Jeopardy" element={<Jeopardy />} />,
    <Route key = "Hangman" path="Hangman" element={<Hangman />} />
]

