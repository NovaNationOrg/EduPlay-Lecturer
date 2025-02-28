// import ReactDOM from "react-dom/client";

// import { useState, useEffect } from 'react'
import './App.css'
// import QRCode from "react-qr-code"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Clone from "./pages/clone"
import Original from "./pages/original";
import Layout from "./pages/layout";
import Jeopardy from "./pages/jeopardy";

import "../src/styles/fonts/fonts.css";
import "../src/styles/jeopardy.css"
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/" >
          <Route index element = {<Layout/>} />
          <Route path ="Original" element = {<Original/>} />
          <Route path="Clone" element={<Clone />} />
          <Route path="Jeopardy" element={<Jeopardy />} />

        </Route>
      </Routes>
      </BrowserRouter>


    </>
  )
}

export default App

