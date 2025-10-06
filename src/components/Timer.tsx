import { useEffect, useState } from 'react';

function Timer() {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    chrome.storage.local.get('remainingSeconds', (data) => {
      if (data.remainingSeconds) setTime(data.remainingSeconds);
    });

    const listener = (changes: any) => {
      if (changes.remainingSeconds.newValue) setTime(changes.remainingSeconds.newValue);
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  function formatTime(secondsRemaining: number) {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return [minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')].join(':');
  }

  return <div className="text-2xl font-mono text-center">{formatTime(time)}</div>;
}

export default Timer;
