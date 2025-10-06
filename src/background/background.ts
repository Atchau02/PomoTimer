type Mode = 'Initial' | 'Work' | 'Break' | 'Finish';

let timerId: number | null = null;
let timerStartTime: number;
let currentMode: Mode = 'Initial';

const workMinutes: number = 0.1;
const breakMinutes: number = 0.05;

let totalWorkSeconds: number = 0;
let totalBreakSeconds: number = 0;

chrome.storage.local.set({
  workMinutes,
  breakMinutes,
  currentMode,
  remainingSeconds: workMinutes * 60,
});

chrome.storage.local.set({ workMinutes, breakMinutes });

function startSession(mode: Mode) {
  if (timerId) return;

  console.log('start session: ', mode);

  currentMode = mode;
  const durationSeconds = mode === 'Work' ? workMinutes * 60 : breakMinutes * 60;
  timerStartTime = Date.now();

  chrome.storage.local.set({ currentMode: mode, remainingSeconds: durationSeconds });

  timerId = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - timerStartTime) / 1000);
    const remainingSeconds = durationSeconds - elapsedSeconds;
    chrome.storage.local.set({ remainingSeconds });

    if (currentMode === 'Work') {
      totalWorkSeconds += elapsedSeconds;
    } else {
      totalBreakSeconds += elapsedSeconds;
    }

    if (remainingSeconds <= 0) {
      clearInterval(timerId!);
      timerId = null;

      if (mode === 'Work') {
        startSession('Break'); // start break after work
      } else if (mode === 'Break') {
        startSession('Work'); // start work after break
      }
    }
  }, 1000);
}

function stopTimer() {
  console.log('stop timer');
}

function finish() {
  console.log('Finish session');
  currentMode = 'Finish';
  clearInterval(timerId!);
  timerId = null;

  chrome.storage.local.set({ currentMode });
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.action) {
    case 'start':
      startSession('Work');
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
