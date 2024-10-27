export const MAJOR_KEYS = [
  "Cb",
  "Gb",
  "Db",
  "Ab",
  "Eb",
  "Bb",
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "C#",
];
export const MINOR_KEYS = [
  "Abm",
  "Ebm",
  "Bbm",
  "Fm",
  "Cm",
  "Gm",
  "Dm",
  "Am",
  "Em",
  "Bm",
  "F#m",
  "C#m",
  "G#m",
  "D#m",
  "A#m",
];

export const STRUCTURES = [
  "major",
  "minor",
  "diminished",
  "augmented",
] as const;
export type KEYS_TYPE = (typeof MAJOR_KEYS)[number];

const KEYBOARD_KEYS: KEYS_TYPE[][] = [
  ["C"],
  ["C#", "Db"],
  ["D"],
  ["D#", "Eb"],
  ["E"],
  ["F"],
  ["F#", "Gb"],
  ["G"],
  ["G#", "Ab"],
  ["A"],
  ["A#", "Bb"],
  ["B"],
] as const;

export type STRUCTURES_TYPES = (typeof STRUCTURES)[number];

export type Chord = {
  keyLetter: KEYS_TYPE;
  type: STRUCTURES_TYPES;
};

const CHORD_TYPES_CONFIG: Record<STRUCTURES_TYPES, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
} as const;

export const getChordKeys = (key: KEYS_TYPE, type: STRUCTURES_TYPES) => {
  const keysByInt = CHORD_TYPES_CONFIG[type];
  const rootIndex = KEYBOARD_KEYS.findIndex((keyboardKey) =>
    keyboardKey.includes(key),
  );

  const keys = keysByInt.map((int) => {
    const position = rootIndex + int;
    const keyPosition = position % KEYBOARD_KEYS.length;

    const keys = KEYBOARD_KEYS[keyPosition];

    if (keyPosition === rootIndex) {
      // If root position then return same key inc accidental
      return key;
    } else if (keys.length === 1) {
      // If white note
      return keys[0];
    } else if (type === "diminished") {
      // Diminished are always flats
      return keys[1];
    } else if (type === "augmented") {
      // Augmented are always sharps
      return keys[0];
    } else if (type === "major") {
      // Check position in circle of fifths to determins sharps or flats
      const cMajPosition = MAJOR_KEYS.indexOf("C");
      const keyPosition = MAJOR_KEYS.indexOf(key);
      const keyPosRel = keyPosition - cMajPosition;

      // Sharps if after C, flats if before
      return keyPosRel > 0 ? keys[0] : keys[1];
    } else if (type === "minor") {
      // Check position in circle of fifths to determins sharps or flats
      const aMinPosition = MINOR_KEYS.indexOf("Am");
      const keyPosition = MINOR_KEYS.indexOf(`${key}m`);
      const keyPosRel = keyPosition - aMinPosition;

      // Sharps if after Am, flats if before
      return keyPosRel > 0 ? keys[0] : keys[1];
    }
  });

  return keys;
};

/** For a given chord ensure that the notes ascend properly, ie for F# major
 * then F#, A#, C# start octave returns F#4, A#4, C#5. Assumes notes hat notes
 * don't jump an octave in sequence.
 */
export const changeChordKeysForOctave = (
  notes: KEYS_TYPE[],
  octave: number,
) => {
  // Letters are in sequence so octave will always increase
  const notesWithOctaves: string[] = [];
  for (const note of notes) {
    const lastNoteWithOctave = notesWithOctaves[notesWithOctaves.length - 1];
    let thisOctave = octave;
    if (lastNoteWithOctave) {
      const lastNote = lastNoteWithOctave.split("/")[0];
      thisOctave = Number(lastNoteWithOctave.split("/")[1]);
      const noteIndex = KEYBOARD_KEYS.findIndex((keyboardKey) =>
        keyboardKey.includes(note),
      );
      const lastNoteIndex = KEYBOARD_KEYS.findIndex((keyboardKey) =>
        keyboardKey.includes(lastNote),
      );
      if (noteIndex < lastNoteIndex) {
        thisOctave++;
      }
    }
    notesWithOctaves.push(`${note}/${thisOctave}`);
  }

  return notesWithOctaves;
};

export const getRandomChord = () => {
  const keyLetter = MAJOR_KEYS[Math.round(Math.random() * MAJOR_KEYS.length)];
  const type = STRUCTURES[Math.round(Math.random() * STRUCTURES.length)];
  const chord: Chord = {
    keyLetter,
    type,
  };

  return chord;
};
