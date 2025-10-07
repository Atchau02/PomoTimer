import { useEffect, useState } from 'react';

import Timer from '../components/Timer';
import Button from '../components/Button';
import TimeSliders from '../components/TimeSliders';

import type { Mode } from '../types';

function Popup() {
  const [mode, setMode] = useState<Mode>('initial');

  useEffect(() => {
    chrome.storage.local.get('currentMode', (data) => {
      if (data.currentMode) setMode(data.currentMode);
    });

    const listener = (changes: any) => {
      if (changes.currentMode.newValue) {
        setMode(changes.currentMode.newValue);
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  function handleStartSession(): void {
    chrome.runtime.sendMessage({ action: 'start' });
  }

  function handleFinishSession(): void {
    chrome.runtime.sendMessage({ action: 'finish' }, (res) => {
      alert(
        `Total work minutes: ${res.totalWorkSeconds / 60}\n
        Total break seconds: ${res.totalBreakSeconds / 60}`,
      );
    });
  }

  return (
    <div className="w-72 p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">PomoTimer</h1>
      <p className="mb-4 text-lg text-gray-700">
        Mode: <span className="font-semibold">{mode}</span>
      </p>

      {(mode === 'initial' || mode === 'finish') && <TimeSliders />}

      <div className="mt-2 flex flex-col items-center gap-4 w-full">
        {(mode === 'initial' || mode === 'finish') && (
          <Button label="Start" clickHandler={handleStartSession} />
        )}
        {(mode === 'work' || mode === 'break') && (
          <>
            <Timer />
            <Button label="Finish" clickHandler={handleFinishSession} />
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
