import type { Mode } from '../types';

let currentMode: Mode = 'setup';
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

chrome.storage.onChanged.addListener((changes: any) => {
  if (changes.workMinutes?.newValue) workMinutes = changes.workMinutes.newValue;
  if (changes.breakMinutes?.newValue) breakMinutes = changes.breakMinutes.newValue;
});

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

    if (currentMode === 'work') totalWorkSeconds += elapsedSeconds;
    else totalBreakSeconds += elapsedSeconds;

    if (remainingSeconds <= 0) {
      clearInterval(timerId!);
      timerId = null;

      chrome.notifications.create({
        type: 'basic',
        iconUrl: chrome.runtime.getURL('icon.png'),
        title: mode === 'work' ? 'Work Interval Finished' : 'Break Finished',
        message: mode === 'work' ? 'Time for a break! ⏰' : 'Break is over! Get back to work! 💪',
        priority: 2,
      });

      if (mode === 'work') startSession('break');
      else if (mode === 'break') startSession('work');
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId!);
  timerId = null;
  console.log('Timer stopped');
}

function finish() {
  currentMode = 'setup';
  clearInterval(timerId!);
  timerId = null;
  chrome.storage.local.set({ currentMode });
  console.log('Session finished');
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
      totalWorkSeconds = 0;
      totalBreakSeconds = 0;
      break;
    default:
      console.log('Unknown action:', message.action);
  }
});
