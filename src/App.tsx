import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { selectStarted, startGame } from "./app/gameSlice";
import { RootState } from "./app/store";

function App() {
  const started = useSelector((state: RootState) => selectStarted(state));
  const dispatch = useDispatch();

  return (
    <Box alignItems={"center"} display={"flex"} flexDirection={"column"}>
      {!started ? (
        <>
          <h1>Guess the Chord!</h1>
          <Button onClick={() => dispatch(startGame())}>Start game</Button>
        </>
      ) : (
        "Game started"
      )}
    </Box>
  );
}

export default App;
