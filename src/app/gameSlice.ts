import { createSlice } from "@reduxjs/toolkit";

import { Chord, getRandomChord } from "../utils/chords";

export interface GameState {
  score: number;
  questions: Chord[];
}

const initialState: GameState = {
  score: 0,
  questions: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      const chord = getRandomChord();
      state.questions.push(chord);
    },
    recordScore: (state) => {
      state.score++;
    },
  },
  selectors: {
    selectScore: (state) => state.score,
    selectQuestion: (state) => {
      if (state.questions.length === 0) {
        return undefined;
      } else {
        return state.questions[state.questions.length - 1];
      }
    },
  },
});

export const { nextQuestion, recordScore } = gameSlice.actions;
export const { selectScore, selectQuestion } = gameSlice.selectors;

export default gameSlice.reducer;
