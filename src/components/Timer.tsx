import { useEffect, useState } from 'react';

function Timer() {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    chrome.storage.local.get('remainingSeconds', (data) => {
      if (data.remainingSeconds) setTime(data.remainingSeconds);
    });

    const listener = (changes: any) => {
      if (changes.remainingSeconds?.newValue) {
        setTime(changes.remainingSeconds.newValue);
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  function formatTime(secondsRemaining: number) {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div
      className="
        text-4xl font-mono font-semibold text-center
        bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50
        text-gray-700
        rounded-2xl py-4 px-6
        shadow-inner border border-white/30
        tracking-wider
        transition-all duration-300
        hover:shadow-lg hover:scale-[1.02]
      "
    >
      {formatTime(time)}
    </div>
  );
}

export default Timer;
