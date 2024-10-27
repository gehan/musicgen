import { ComponentProps, useEffect, useMemo, useState } from "react";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  KEYS_TYPE,
  MAJOR_KEYS,
  STRUCTURES,
  STRUCTURES_TYPES,
} from "./utils/chords";
import { Chord } from "./Chord";

type Props = {
  keyLetter: KEYS_TYPE;
  type: STRUCTURES_TYPES;
  onComplete: (result: boolean) => void;
};

const keysSorted = [...MAJOR_KEYS].sort();

const getClef = () => {
  if (Math.random() < 0.5) {
    return "treble";
  } else {
    return "bass";
  }
};

const getOctave = (clef: ComponentProps<typeof Chord>["clef"]) => {
  const lessHalf = Math.random() < 0.5;
  switch (clef) {
    case "bass":
      return lessHalf ? 2 : 3;
    case "treble":
      return lessHalf ? 4 : 5;
  }
};

export const GuessChord = ({ keyLetter, type, onComplete }: Props) => {
  // Selection
  const [selectedKey, setSelectedKey] = useState<KEYS_TYPE>();
  const [selectedType, setSelectedType] = useState<STRUCTURES_TYPES>();

  // Get random clef and octave
  const [clef, setClef] =
    useState<ComponentProps<typeof Chord>["clef"]>(getClef);
  const [octave, setOctave] = useState<ComponentProps<typeof Chord>["octave"]>(
    () => getOctave(clef),
  );

  // When both selected
  const result = useMemo<boolean | undefined>(() => {
    if (!selectedKey || !selectedType) {
      return undefined;
    }
    return selectedKey === keyLetter && selectedType === type;
  }, [keyLetter, type, selectedType, selectedKey]);

  // Trigger onComplete after result known
  useEffect(() => {
    if (result !== undefined) {
      onComplete(result);
    }
  }, [result, onComplete]);

  // Reset result when props change
  useEffect(() => {
    setSelectedKey(undefined);
    setSelectedType(undefined);
    const clef = getClef();
    const octave = getOctave(clef);
    setClef(clef);
    setOctave(octave);
  }, [keyLetter, type]);

  return (
    <Box textAlign="center">
      <Typography variant="h5">Guess the Chord!</Typography>
      <Chord clef={clef} octave={octave} keyLetter={keyLetter} type={type} />
      <Stack gap={2} alignItems={"center"}>
        <Box
          sx={{
            color:
              result === true ? "green" : result === false ? "red" : undefined,
            display: "flex",
          }}
        >
          {result === true ? (
            <CheckCircleIcon />
          ) : result === false ? (
            <CancelIcon />
          ) : undefined}
          {result === undefined ? "Select chord" : `${keyLetter} ${type}`}
        </Box>
        <ButtonGroup variant="outlined">
          {keysSorted.map((letter) => (
            <Button
              onClick={() => setSelectedKey(letter)}
              variant={selectedKey === letter ? "contained" : "outlined"}
            >
              {letter}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          {STRUCTURES.map((type) => (
            <Button
              onClick={() => setSelectedType(type)}
              variant={selectedType === type ? "contained" : "outlined"}
              disabled={!selectedKey}
            >
              {type}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>
    </Box>
  );
};
