import './App.css'
import {BrowserRouter} from "react-router-dom"
import "../src/styles/fonts/fonts.css";
import "../src/styles/jeopardy/jeopardy.css"
import AnimatedRoutes from './components/animatedroutes';
function App() {
  return (
    <>
      <BrowserRouter>
        <AnimatedRoutes/>
      </BrowserRouter>
    </>
  )
}

export default App

