import { useState } from 'react';

enum Mode {
  initial = 'INITIAL',
  active = 'ACTIVE',
  break = 'BREAK',
  finish = 'FINISH',
}

function Popup() {
  const [mode, setMode] = useState<Mode>(Mode.initial);

  return (
    <>
      <h1 className="text-3xl font-bold underline">PomoTimer</h1>
      <p>Mode: {mode}</p>
      <button onClick={() => setMode(Mode.active)}>Start</button>
    </>
  );
}

export default Popup;
