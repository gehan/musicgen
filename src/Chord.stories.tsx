import { Meta, StoryObj } from "@storybook/react";
import { Chord } from "./Chord";

const meta: Meta<typeof Chord> = {
  title: "Chord",
  component: Chord,
};
export default meta;

type Story = StoryObj<typeof Chord>;

export const CMajorTrebleOctave4: Story = {
  args: {
    keyLetter: "C",
    type: "major",
    clef: "treble",
    octave: 4,
  },
};

export const CMajorBassOctave3: Story = {
  args: {
    keyLetter: "C",
    type: "major",
    clef: "bass",
    octave: 3,
  },
};

export const CMinorTrebleOctave4: Story = {
  args: {
    keyLetter: "C",
    type: "minor",
    clef: "treble",
    octave: 4,
  },
};

export const FSharpMajorTrebleOctave4: Story = {
  args: {
    keyLetter: "F#",
    type: "major",
    clef: "treble",
    octave: 4,
  },
};

export const EbMajorTrebleOctave4: Story = {
  args: {
    keyLetter: "Eb",
    type: "major",
    clef: "bass",
    octave: 3,
  },
};

export const EbMinorTrebleOctave4: Story = {
  args: {
    keyLetter: "Eb",
    type: "minor",
    clef: "bass",
    octave: 3,
  },
};
