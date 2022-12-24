import Board from "./Board";
import { useState } from "react";

function Game() {
  const [round, setRound] = useState(1);

  return (<>
    <h1 className="text-center text-4xl font-bold antialiased my-12">Snake</h1>
    <div className="flex justify-center">
      <Board key={round} round={round} height={30} width={30} delay={100} handleReset={() => setRound(round + 1)} />
    </div>
  </>);
}

export default Game;