document.addEventListener('DOMContentLoaded', () => {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const pomodoroBtn = document.getElementById('pomodoro-btn');
    const shortBreakBtn = document.getElementById('short-break-btn');
    const longBreakBtn = document.getElementById('long-break-btn');
    const timerSound = document.getElementById('timer-sound');
    const body = document.body;

    let timerInterval;
    let isPaused = true;
    let totalSeconds = 25 * 60;
    let currentSession = 'pomodoro';

    const sessionTimes = {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60
    };

    const sessionColors = {
        pomodoro: '#F7F9FC', // Light background for work
        shortBreak: '#E6F3F3', // Calming light green/blue for short break
        longBreak: '#D8E8F5' // A different calming blue for long break
    };

    function updateDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if (!isPaused) return;

        isPaused = false;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';

        timerInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                isPaused = true;
                timerSound.play();
                alert(`${currentSession} session is over! Time for a change!`);
                switchSession();
                return;
            }
            totalSeconds--;
            updateDisplay();
        }, 1000);
    }

    function pauseTimer() {
        isPaused = true;
        clearInterval(timerInterval);
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }

    function resetTimer() {
        pauseTimer();
        setSession('pomodoro');
        updateDisplay();
    }

    function setSession(session) {
        currentSession = session;
        totalSeconds = sessionTimes[session];
        document.querySelectorAll('.session-type button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`${session}-btn`).classList.add('active');
        body.style.backgroundColor = sessionColors[session];
        updateDisplay();
    }

    function switchSession() {
        let nextSession = 'pomodoro';
        if (currentSession === 'pomodoro') {
            nextSession = 'shortBreak';
        } else if (currentSession === 'shortBreak') {
            nextSession = 'longBreak';
        }
        setSession(nextSession);
        startTimer();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    pomodoroBtn.addEventListener('click', () => {
        pauseTimer();
        setSession('pomodoro');
    });

    shortBreakBtn.addEventListener('click', () => {
        pauseTimer();
        setSession('shortBreak');
    });

    longBreakBtn.addEventListener('click', () => {
        pauseTimer();
        setSession('longBreak');
    });

    // Handle initial state
    setSession('pomodoro');
});