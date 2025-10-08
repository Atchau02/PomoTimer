import { useState, useEffect } from 'react';

function TimeSliders() {
  const [workMinutes, setWorkMinutes] = useState<number>();
  const [breakMinutes, setBreakMinutes] = useState<number>();

  // GET storage
  useEffect(() => {
    chrome.storage.local.get(['workMinutes', 'breakMinutes'], (data) => {
      if (data.workMinutes) setWorkMinutes(data.workMinutes);
      if (data.breakMinutes) setBreakMinutes(data.breakMinutes);
    });
  }, []);

  // SET storage
  useEffect(() => {
    chrome.storage.local.get(['workMinutes', 'breakMinutes'], (data) => {
      if (data.workMinutes !== workMinutes || data.breakMinutes !== breakMinutes) {
        chrome.storage.local.set({
          workMinutes,
          breakMinutes,
          remainingSeconds: workMinutes! * 60,
        });
      }
    });
  }, [workMinutes, breakMinutes]);

  return (
    <div className="w-full space-y-6">
      <div>
        <label className="text-sm font-semibold block mb-1 text-purple-700">
          Work Time: {workMinutes} min
        </label>
        <input
          type="range"
          min="1"
          max="60"
          step="1"
          value={workMinutes}
          onChange={(e) => setWorkMinutes(Number(e.target.value))}
          className="w-full h-2 rounded-lg accent-pink-400 cursor-pointer shadow-sm"
        />
      </div>

      <div>
        <label className="text-sm font-semibold block mb-1 text-cyan-700">
          Break Time: {breakMinutes} min
        </label>
        <input
          type="range"
          min="1"
          max="60"
          step="1"
          value={breakMinutes}
          onChange={(e) => setBreakMinutes(Number(e.target.value))}
          className="w-full h-2 rounded-lg accent-purple-400 cursor-pointer shadow-sm"
        />
      </div>
    </div>
  );
}

export default TimeSliders;
