import type { Mode } from '../types';

let currentMode: Mode = 'initial';

let timerId: number | null = null;
let timerStartTime: number;

let workMinutes: number = 25;
let breakMinutes: number = 5;

let totalWorkSeconds: number = 0;
let totalBreakSeconds: number = 0;

chrome.storage.local.set({
  workMinutes,
  breakMinutes,
  currentMode,
  remainingSeconds: workMinutes * 60,
});

const listener = (changes: any) => {
  workMinutes = changes.workMinutes.newValue ?? workMinutes;
  breakMinutes = changes.breakMinutes.newValue ?? breakMinutes;
};

chrome.storage.onChanged.addListener(listener);

function startSession(mode: Mode) {
  if (timerId) return;

  currentMode = mode;
  const durationSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;
  timerStartTime = Date.now();

  chrome.storage.local.set({ currentMode: mode, remainingSeconds: durationSeconds });

  timerId = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - timerStartTime) / 1000);
    const remainingSeconds = durationSeconds - elapsedSeconds;
    chrome.storage.local.set({ remainingSeconds });

    if (currentMode === 'work') {
      totalWorkSeconds += elapsedSeconds;
    } else {
      totalBreakSeconds += elapsedSeconds;
    }

    if (remainingSeconds <= 0) {
      clearInterval(timerId!);
      timerId = null;

      if (mode === 'work') {
        startSession('break'); // start break after work
      } else if (mode === 'break') {
        startSession('work'); // start work after break
      }
    }
  }, 1000);
}

function stopTimer() {
  console.log('stop timer');
}

function finish() {
  console.log('Finish session');
  currentMode = 'finish';
  clearInterval(timerId!);
  timerId = null;

  chrome.storage.local.set({ currentMode });
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.action) {
    case 'start':
      startSession('work');
      break;
    case 'stop':
      stopTimer();
      break;
    case 'finish':
      finish();
      sendResponse({
        totalWorkSeconds,
        totalBreakSeconds,
      });
      totalBreakSeconds = 0;
      totalWorkSeconds = 0;
      break;
    default:
      console.log('action not handled');
  }
});
