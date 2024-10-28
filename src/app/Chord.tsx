import { useEffect, useRef } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  KeySignature,
} from "vexflow";

import {
  changeChordKeysForOctave,
  getChordKeys,
  KEYS_TYPE,
  STRUCTURES_TYPES,
} from "../utils/chords";

type Props = {
  keyLetter: KEYS_TYPE;
  type: STRUCTURES_TYPES;
  clef: "treble" | "bass";
  octave: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

function isString(str: string | undefined): str is string {
  return str !== undefined;
}

export const Chord = ({ keyLetter, type, clef, octave }: Props) => {
  const container = useRef(null);
  const rendererRef = useRef<Renderer>();

  useEffect(() => {
    if (rendererRef.current === undefined && container.current !== null) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG,
      );
    }
  }, []);

  useEffect(() => {
    const renderer = rendererRef.current!;
    renderer.resize(200, 125);
    const context = renderer.getContext();
    context.clear();

    // Add stave
    const stave = new Stave(0, 0, 200);
    stave.addClef(clef);

    // Add key signaure
    const fullKey = `${keyLetter}${type === "minor" ? "m" : ""}`;
    const keySig = new KeySignature(fullKey);
    keySig.addToStave(stave);

    // Add notes to stave
    const chordNotes = getChordKeys(keyLetter, type);

    const notes = [
      new StaveNote({
        keys: changeChordKeysForOctave(chordNotes.filter(isString), octave),
        duration: "w",
        clef,
      }),
    ];

    // Create a voice in 4/4 and add above notes
    const voice = new Voice({ num_beats: 1, beat_value: 1 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 150);

    // Render voice
    voice.draw(context, stave);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
  }, [keyLetter, type, clef, octave]);

  return <div ref={container} />;
};
