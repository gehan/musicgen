import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Chord, getRandomChord } from "../utils/chords";

export interface GameState {
  started: boolean;
  score: number;
  questions: Chord[];
  answers: Chord[];
}

const initialState: GameState = {
  started: false,
  score: 0,
  questions: [],
  answers: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: () => {
      return {
        ...initialState,
        started: true,
      };
    },
    nextQuestion: (state) => {
      const chord = getRandomChord();
      state.questions.push(chord);
    },
    recordAnswer: (state, action: PayloadAction<Chord>) => {
      const lastAnswer = state.questions[state.questions.length - 1];
      state.answers.push(action.payload);
      state.score++;
    },
  },
  selectors: {
    selectStarted: (state) => state.started,
  },
});

export const { startGame, nextQuestion, recordAnswer } = gameSlice.actions;
export const { selectStarted } = gameSlice.selectors;

export default gameSlice.reducer;
