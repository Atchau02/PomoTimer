import { useEffect, useState } from 'react';
import Timer from '../components/Timer';

type Mode = 'Initial' | 'Work' | 'Break' | 'Finish';

function Popup() {
  const [mode, setMode] = useState<Mode>('Initial');

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

      <Timer />

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleStartSession}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Start
        </button>
        <button
          onClick={handleFinishSession}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default Popup;
