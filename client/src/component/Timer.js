import React, { useState, useEffect } from 'react';
import '../component.css';

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const { hours, minutes, seconds } = prevTime;

          if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(interval);
            setIsRunning(false);
            // Perform any desired action when the countdown reaches zero
          }

          if (seconds > 0) {
            return { hours, minutes, seconds: seconds - 1 };
          } else if (minutes > 0) {
            return { hours, minutes: minutes - 1, seconds: 59 };
          } else if (hours > 0) {
            return { hours: hours - 1, minutes: 59, seconds: 59 };
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startCountdown = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopCountdown = () => {
    if (isRunning) {
      setIsRunning(false);
      setTime({ hours: 0, minutes: 0, seconds: 0 });
    }
  };

  const pauseCountdown = () => {
    setIsRunning(false);
  };

  const formatTime = (timeValue) => {
    return timeValue.toString().padStart(2, '0');
  };

  return (
    <div className='cadreTimer'>
 
     <div className='timer'>
     Timer: {`${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(
          time.seconds
        )}`}
      </div>
      <br></br>
      <div className='timer'>
        <label>
          Hours:
          <input
            type="number"
            value={time.hours}
            onChange={(e) =>
              setTime((prevTime) => ({
                ...prevTime,
                hours: parseInt(e.target.value, 10),
              }))
            }
          />
        </label>
        <label>
          Minutes:
          <input
            type="number"
            value={time.minutes}
            onChange={(e) =>
              setTime((prevTime) => ({
                ...prevTime,
                minutes: parseInt(e.target.value, 10),
              }))
            }
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            value={time.seconds}
            onChange={(e) =>
              setTime((prevTime) => ({
                ...prevTime,
                seconds: parseInt(e.target.value, 10),
              }))
            }
          />
        </label>
      </div>
      <br></br>
      <div className='timerbutton'>
        <button onClick={startCountdown}>Start</button>
        <button onClick={stopCountdown}>Stop</button>
        <button onClick={pauseCountdown}>Pause</button>
      </div>

    </div>
  );
};

export default Timer;
