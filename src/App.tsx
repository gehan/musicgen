import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  nextQuestion,
  recordScore,
  selectQuestion,
  selectScore,
} from "./app/gameSlice";
import { GuessChord } from "./GuessChord";
import { useCallback } from "react";

function App() {
  const score = useSelector(selectScore);
  const question = useSelector(selectQuestion);
  const dispatch = useDispatch();

  const handleStartGame = useCallback(() => {
    dispatch(nextQuestion());
  }, [dispatch]);

  const handleComplete = useCallback(
    (result: boolean) => {
      if (result) {
        dispatch(recordScore());
      }
      setTimeout(() => {
        dispatch(nextQuestion());
      }, 1000);
    },
    [dispatch],
  );

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
          <GuessChord
            type={question.type}
            keyLetter={question.keyLetter}
            onComplete={handleComplete}
          />
        </div>
      )}
    </Box>
  );
}

export default App;
