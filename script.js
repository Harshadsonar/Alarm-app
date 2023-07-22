const activeTimers = [];
const alertSound = document.getElementById("alert-sound");

document.getElementById("start-timer").addEventListener("click", () => {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert("Please enter a valid time.");
        return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    createTimer(totalSeconds);
});

function createTimer(totalSeconds) {
    const timerId = Date.now();
    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    timerElement.innerHTML = `
    <h2>Timer ${activeTimers.length + 1}</h2>
    <p id="timer-${timerId}">${formatTime(totalSeconds)}</p>
    <button data-id="${timerId}" onclick="stopTimer(${timerId})">Stop Timer</button>
  `;
    document.getElementById("active-timers").appendChild(timerElement);

    const intervalId = setInterval(() => {
        totalSeconds--;
        const timerDisplay = document.getElementById(`timer-${timerId}`);
        timerDisplay.innerText = formatTime(totalSeconds);

        if (totalSeconds === 0) {
            clearInterval(intervalId);
            timerDisplay.parentElement.classList.add("timer-ended");
            timerDisplay.parentElement.innerHTML = `
        <h2>Timer Ended</h2>
        <p>00:00:00</p>
        <button onclick="removeTimer(${timerId})">Remove Timer</button>
      `;
            alertSound.play();
        }
    }, 1000);

    activeTimers.push({ id: timerId, intervalId });
}

function stopTimer(timerId) {
    const timerIndex = activeTimers.findIndex(timer => timer.id === timerId);
    if (timerIndex !== -1) {
        clearInterval(activeTimers[timerIndex].intervalId);
        activeTimers.splice(timerIndex, 1);
        document.getElementById("active-timers").removeChild(document.querySelector(`[data-id="${timerId}"]`).parentElement);
    }
}

function removeTimer(timerId) {
    const timerIndex = activeTimers.findIndex(timer => timer.id === timerId);
    if (timerIndex !== -1) {
        clearInterval(activeTimers[timerIndex].intervalId);
        activeTimers.splice(timerIndex, 1);
        document.getElementById("active-timers").removeChild(document.querySelector(`[data-id="${timerId}"]`).parentElement);
    }
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}