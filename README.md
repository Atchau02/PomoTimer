# Pomotimer ⏱️

**Pomotimer** is a relaxing, pastel-themed Pomodoro timer Chrome extension. It helps you stay focused during work sessions and reminds you to take breaks, all while providing soothing visuals and gentle notification sounds.

---

## Features

- 🕓 **Custom Work & Break Intervals**  
  Adjust your work and break times with smooth pastel sliders.

- 🎵 **Audio Alerts**  
  Gentle bell sounds notify you when a session starts or ends.

- 🎨 **Soothing Aesthetic**  
  Relaxing pastel gradients, soft shadows, and rounded controls for a pleasant experience.

- ⏱️ **Persistent Timer**  
  Timer state is saved in Chrome storage and continues even if the popup is closed.

- 🔔 **Notifications**  
  Desktop notifications alert you when work or break intervals finish.

---

## Screenshots
<img width="323" height="310" alt="Screenshot 2025-10-07 at 8 48 49 PM" src="https://github.com/user-attachments/assets/54f1ebeb-bb5c-472c-ab09-68f116977dbc" />

<img width="321" height="275" alt="Screenshot 2025-10-07 at 8 49 01 PM" src="https://github.com/user-attachments/assets/7bf1fa35-01e9-4be3-b189-80c16777f373" />

<img width="322" height="276" alt="Screenshot 2025-10-07 at 8 51 10 PM" src="https://github.com/user-attachments/assets/da16af96-7b8f-43da-869d-68453a6d024b" />

---

## Installation

1. Clone or download this repository:
2. git clone https://github.com/yourusername/pomotimer.git
3. Open Chrome and go to chrome://extensions/.
4. Enable Developer Mode (top-right corner).
5. Click Load unpacked and select the project folder.
6. The extension icon should appear in your toolbar.

## Usage

1. Click the Pomotimer icon in Chrome.
2. Set your preferred work and break intervals using the sliders.
3. Click Start to begin your work session.
4. Click Finish to end the session and view a summary of total work and break minutes.
5. Enjoy the soft pastel arcade theme and audio notifications!

## Permissions

This extension requires the following permissions:
- storage – to save timer settings and progress.
- notifications – to alert you when a session ends.

## Tech Stack

- React – For the popup UI.
- TypeScript – For type safety and better development experience.
- TailwindCSS – For pastel arcade styling.
- Chrome Storage API – For persistent timer data.
- Chrome Notifications API – For desktop notifications.
