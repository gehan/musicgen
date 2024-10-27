import { describe, expect, test } from "vitest";
import { changeChordKeysForOctave, getChordKeys } from "./chords";

describe("Calculates major chords", () => {
  test("C major", () => {
    expect(getChordKeys("C", "major")).toEqual(["C", "E", "G"]);
  });
  test("C# major", () => {
    expect(getChordKeys("C#", "major")).toEqual(["C#", "F", "G#"]);
  });
  test("A major", () => {
    expect(getChordKeys("A", "major")).toEqual(["A", "C#", "E"]);
  });
  test("Bb major", () => {
    expect(getChordKeys("Bb", "major")).toEqual(["Bb", "D", "F"]);
  });
  test("Eb major", () => {
    expect(getChordKeys("Eb", "major")).toEqual(["Eb", "G", "Bb"]);
  });
});

describe("Calculates minor chords", () => {
  test("c minor", () => {
    expect(getChordKeys("C", "minor")).toEqual(["C", "Eb", "G"]);
  });
  test("g minor", () => {
    expect(getChordKeys("G", "minor")).toEqual(["G", "Bb", "D"]);
  });
  test("b minor", () => {
    expect(getChordKeys("B", "minor")).toEqual(["B", "D", "F#"]);
  });
});

describe("Calculates diminished chords", () => {
  test("C diminished", () => {
    expect(getChordKeys("C", "diminished")).toEqual(["C", "Eb", "Gb"]);
  });
  test("C# diminished", () => {
    expect(getChordKeys("C#", "diminished")).toEqual(["C#", "E", "G"]);
  });
  test("A diminished", () => {
    expect(getChordKeys("A", "diminished")).toEqual(["A", "C", "Eb"]);
  });
});

describe("Calculates augmented chords", () => {
  test("C augmented", () => {
    expect(getChordKeys("C", "augmented")).toEqual(["C", "E", "G#"]);
  });
  test("C# augmented", () => {
    expect(getChordKeys("C#", "augmented")).toEqual(["C#", "F", "A"]);
  });
  test("A augmented", () => {
    expect(getChordKeys("A", "augmented")).toEqual(["A", "C#", "F"]);
  });
});

describe("changeChordsKeysForOctave", () => {
  test("CDE octave 4", () => {
    expect(changeChordKeysForOctave(["C", "D", "E"], 4)).toEqual([
      "C/4",
      "D/4",
      "E/4",
    ]);
  });

  test("ABC octave 4, C goes higher", () => {
    expect(changeChordKeysForOctave(["A", "B", "C"], 4)).toEqual([
      "A/4",
      "B/4",
      "C/5",
    ]);
  });

  test("F#A#C# octave 4, C goes higher", () => {
    expect(changeChordKeysForOctave(["F#", "A#", "C#"], 4)).toEqual([
      "F#/4",
      "A#/4",
      "C#/5",
    ]);
  });

  test("ABCABC octave 4, C goes higher", () => {
    expect(changeChordKeysForOctave(["A", "B", "C", "A", "B", "C"], 4)).toEqual(
      ["A/4", "B/4", "C/5", "A/5", "B/5", "C/6"],
    );
  });
});
