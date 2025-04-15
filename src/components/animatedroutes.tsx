import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/home";
import Library from "../pages/library";
import Prev_Games from "../pages/previous-games";
import QrPage from "../pages/qr-page";
import gameRoutes from "../routes/game-routes";
import CSV from "../pages/csv-import-func";

import {AnimatePresence } from "framer-motion"

export default function AnimatedRoutes(){
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path = "/" >
          <Route index element = {<Home/>} />
          <Route path="qr-page" element = {<QrPage/>} />
          {gameRoutes}
          <Route path="CSV" element={<CSV />} />
          <Route path="PreviousGames" element={<Prev_Games />} />
          <Route path="Library" element={<Library/>}/>
        </Route>
      </Routes>
      </AnimatePresence>
    )
}