import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import { nextQuestion, selectQuestion, selectScore } from "./gameSlice";
import { ChordDisplay } from "./ChordDisplay";

function App() {
  const score = useSelector(selectScore);
  const question = useSelector(selectQuestion);
  const dispatch = useDispatch();

  const handleStartGame = useCallback(() => {
    console.log("nexto");
    dispatch(nextQuestion());
  }, [dispatch]);

  return (
    <Box alignItems={"center"} display={"flex"} flexDirection={"column"}>
      {!question ? (
        <>
          <h1>Guess the Chord!</h1>
          <Button onClick={handleStartGame}>Start game</Button>
        </>
      ) : (
        <div>
          <div>Score: {score}</div>
          <ChordDisplay />
        </div>
      )}
    </Box>
  );
}

export default App;
