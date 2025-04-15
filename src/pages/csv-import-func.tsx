import { ChangeEvent, useState } from "react";
import { parse } from "csv-parse/browser/esm/sync";
import { addJeopardyGame } from "../database/scripts/jeopardy-import";
import { Link } from "react-router-dom";
import {generateUUID} from "../components/uuid-generator";
import { Toaster , toast} from "sonner";
import "./../styles/csv-import.css"; 
import { addHangmanGame } from "../database/scripts/hangman/hangman-import";
import { motion } from "framer-motion"


export type Jeopardy = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export type Hangman = {
  id: string;
  category: string;
  question: string;
  answer:string
};

type Game = {
  id: string;
  name: string;
};

export default function GameSelectionCSVProcessor() {
  const [csvData, setCsvData] = useState<Jeopardy[]| Hangman[]>([]);
  const [, setFilename] = useState("");
  const [status, setStatus] = useState<'initial' | 'success' | 'fail' | 'invalid_count'>('initial');
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [gameId,setGameID] = useState("")

  function prepareCode(){
    let game_code = localStorage.getItem("game_code")
    localStorage.setItem(game_code+"game_id",game_code+gameId)
  }

  const gameOptions: Game[] = [
    { id: "_jp_", name: "Jeopardy" },
    {id: "_hm_", name: "Hangman" }

  ];


  const handleGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const gameId = e.target.value;
    setSelectedGame(gameId);

    if (file) {
      processFile(file, gameId);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFilename(uploadedFile.name);

    if (selectedGame) {
      processFile(uploadedFile, selectedGame);

    }
    else {
      toast.warning("Please select a game type first", {id:"error-game-selection"});
    }
  };

  const processFile = (fileToProcess: File, gameId: string) => {
    const reader = new FileReader();

    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        setStatus('fail');
        toast.error("Failed to read file contents", {id:"error-file-read"});
        return;
      }

      const { result } = evt.target;
      switch(gameId){
        case "_jp_":
          processJeopardyFile(result,setStatus,setCsvData,setGameID)
          break;
        case "_hm_":
          processHangmanFile(result,setStatus,setCsvData,setGameID)
          break;
          
        }
        
    };

    reader.readAsText(fileToProcess);
  };

  return (
       <motion.div
       className="game-csv"
        initial = {{opacity:0}}
        animate  ={{opacity:1}}
        exit={{opacity:0}}
        >
      <Toaster richColors position="top-right" />

      <div className="controls">
        <div className="select-container">
          <label htmlFor="select-game">Select game:</label>
          <hr></hr>
          <select
            id="select-game"
            value={selectedGame}
            onChange={handleGameChange}
            className="select-game"
          >
            <option value="">Select a game</option>
            {gameOptions.map(game => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>

        <div className="upload-file-container">
          <label className="upload-file-button">
            Upload file
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={!selectedGame}
            />
          </label>
          {status =="success" &&
            <Link to ="/qr-page">
            <button onClick={prepareCode}>Generate Code</button>
            </Link>
          }
        </div>
      </div>

      {status === 'success' && (
        <>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th> ID </th>
                  <th>Category</th>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>

              <tbody>
                {csvData.map((row) => (
                  <tr>
                    <td> {row.id}</td>
                    <td>{row.category}</td>
                    <td>{row.question}</td>
                    {
                      row.answer && 
                      <td>{row.answer}</td>

                    }

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </>

      )}
    </motion.div>

  );

}

function processJeopardyFile(result:string | ArrayBuffer,setStatus:React.Dispatch<React.SetStateAction<"initial" | "success" | "fail" | "invalid_count">>,
  setCsvData:React.Dispatch<React.SetStateAction<Jeopardy[] | Hangman[]>>, setGameID: React.Dispatch<React.SetStateAction<string>>) {

  try {

  let records = parse(result as string, {
    columns: ["category", "question", "answer"],
    delimiter: ",",
    trim: true,
    skip_empty_lines: true,
    from_line: 2
  });

  const required_records = 30;

  const recordsWithId = records.map((record: any, index: number) => ({
    id: (index + 1).toString(),
    ...record
  }));

  if (recordsWithId.length !== required_records) {
    setStatus('invalid_count');
    toast.warning(`CSV must contain exactly ${required_records} records (6 categories x 5 questions). Found: ${recordsWithId.length}`, {id:"error-record-count"});
    return;
  }

  setCsvData(recordsWithId as Jeopardy[]);
  setStatus('success');
  const gameID = generateUUID()
  addJeopardyGame(recordsWithId,gameID);
  setGameID(gameID)
  toast.success(`Successfully created game with ${recordsWithId.length} questions for Jeopardy`, {id:"success-process"});
  console.log(`Parsed CSV data for Jeopardy:`, recordsWithId);
}

  catch (error) {
  console.error("Error parsing CSV:", error);
  setStatus('fail');
  toast.error("Failed to parse CSV file. Please check the format and try again.", {id:"error-parse"});

}



}
function processHangmanFile(result:string | ArrayBuffer,setStatus:React.Dispatch<React.SetStateAction<"initial" | "success" | "fail" | "invalid_count">>,
  setCsvData:React.Dispatch<React.SetStateAction<Jeopardy[] | Hangman[]>>, setGameID: React.Dispatch<React.SetStateAction<string>>) {

    try {

    let records = parse(result as string, {
      columns: ["category", "question"],
      delimiter: ",",
      trim: true,
      skip_empty_lines: true,
      from_line: 2
    });


    const recordsWithId = records.map((record: any, index: number) => ({
      id: (index + 1).toString(),
      ...record
    }));


    setCsvData(recordsWithId as Hangman[]);
    setStatus('success');
    const gameID = generateUUID()
    addHangmanGame(recordsWithId,gameID);
    setGameID(gameID)
    toast.success(`Successfully created game with ${recordsWithId.length} questions for Jeopardy`, {id:"success-process"});
    console.log(`Parsed CSV data for Jeopardy:`, recordsWithId);
  }

    catch (error) {
    console.error("Error parsing CSV:", error);
    setStatus('fail');
    toast.error("Failed to parse CSV file. Please check the format and try again.", {id:"error-parse"});

}
}

