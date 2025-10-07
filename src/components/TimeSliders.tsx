import { useState, useEffect } from 'react';

function TimeSliders() {
  const [workMinutes, setWorkMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);

  // GET storage
  useEffect(() => {
    chrome.storage.local.get(['workMinutes', 'breakMinutes'], (data) => {
      if (data.workMinutes) setWorkMinutes(data.workMinutes);
      if (data.breakMinutes) setBreakMinutes(data.breakMinutes);
    });
  }, []);

  // SET storage
  useEffect(() => {
    chrome.storage.local.set({ workMinutes, breakMinutes, remainingSeconds: workMinutes * 60 });
  }, [workMinutes, breakMinutes]);

  return (
    <div className="w-full space-y-4">
      <div>
        <label className="text-sm font-medium block mb-1">Work Time: {workMinutes} min</label>
        <input
          type="range"
          min="1"
          max="60"
          step="1"
          value={workMinutes}
          onChange={(e) => setWorkMinutes(Number(e.target.value))}
          className="w-full accent-black cursor-pointer"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">Break Time: {breakMinutes} min</label>
        <input
          type="range"
          min="1"
          max="60"
          step="1"
          value={breakMinutes}
          onChange={(e) => setBreakMinutes(Number(e.target.value))}
          className="w-full accent-black cursor-pointer"
        />
      </div>
    </div>
  );
}

export default TimeSliders;
