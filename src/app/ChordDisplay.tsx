import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import { GuessChord } from "./GuessChord";
import { nextQuestion, recordScore, selectQuestion } from "./gameSlice";

export const ChordDisplay = () => {
  const dispatch = useDispatch();
  console.log("render");

  const question = useSelector(selectQuestion);
  const handleComplete = useCallback(
    (result: boolean) => {
      console.log("complete");
      if (result) {
        dispatch(recordScore());
      }
      setTimeout(() => {
        console.log("next");
        dispatch(nextQuestion());
      }, 1000);
    },
    [dispatch],
  );
  if (!question) {
    return;
  }

  return (
    <GuessChord
      type={question.type}
      keyLetter={question.keyLetter}
      onComplete={handleComplete}
    />
  );
};
