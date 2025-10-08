import { useEffect, useState, useMemo } from 'react';
import Timer from '../components/Timer';
import Button from '../components/Button';
import TimeSliders from '../components/TimeSliders';
import type { Mode } from '../types';

function Popup() {
  const startAudio = useMemo(() => new Audio(chrome.runtime.getURL('bike-bell-ring.wav')), []);
  const finishAudio = useMemo(() => new Audio(chrome.runtime.getURL('achievement-bell.wav')), []);

  const [mode, setMode] = useState<Mode>('setup');

  useEffect(() => {
    chrome.storage.local.get('currentMode', (data) => {
      if (data.currentMode) setMode(data.currentMode);
    });

    const listener = (changes: any) => {
      if (changes.currentMode?.newValue) setMode(changes.currentMode.newValue);
    };

    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  function handleStartSession(): void {
    startAudio.play();
    chrome.runtime.sendMessage({ action: 'start' });
  }

  async function handleFinishSession(): Promise<void> {
    await finishAudio.play();

    setTimeout(() => {
      chrome.runtime.sendMessage({ action: 'finish' }, (res) => {
        alert(
          `Total work minutes: ${(res.totalWorkSeconds / 60).toFixed(2)}\n` +
            `Total break seconds: ${(res.totalBreakSeconds / 60).toFixed(2)}`,
        );
      });
    }, 100);
  }

  return (
    <div className="w-80 p-6 rounded-3xl shadow-lg bg-gradient-to-b from-pink-100 via-purple-100 to-cyan-100 text-gray-800 flex flex-col items-center font-sans relative overflow-hidden">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-200/20 to-cyan-200/20 blur-2xl pointer-events-none" />

      <h1 className="text-3xl font-extrabold mb-4 text-center text-purple-700 tracking-wide drop-shadow-md">
        Pomo<span className="text-pink-400">Timer</span>
      </h1>

      <p className="mb-4 text-lg">
        Mode: <span className="font-semibold text-cyan-600">{mode}</span>
      </p>

      <div className="flex flex-col items-center gap-4 w-full z-10">
        {mode === 'setup' ? (
          <>
            <TimeSliders />
            <Button label="Start" clickHandler={handleStartSession} />
          </>
        ) : (
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
