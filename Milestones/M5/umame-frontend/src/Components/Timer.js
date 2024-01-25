import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import './CSS/Timer.css';

const Timer = ({ onClose }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        let interval = null;

        if (timerOn && timeInSeconds > 0) {
            interval = setInterval(() => {
                setTimeInSeconds((prevTime) => prevTime - 1);
            }, 1000);
        } else if (!timerOn && timeInSeconds === 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn, timeInSeconds]);

    const startTimer = () => {
        setTimeInSeconds(minutes * 60 + seconds);
        setTimerOn(true);
    };

    const stopTimer = () => {
        setTimerOn(false);
    };

    const resetTimer = () => {
        setMinutes(0);
        setSeconds(0);
        setTimeInSeconds(0);
        setTimerOn(false);
    };

    const formatTime = () => {
        const mins = Math.floor(timeInSeconds / 60);
        const secs = timeInSeconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="timer-container" onClick={(e) => e.stopPropagation()}>
            <Typography variant="h3" className="timer-display" onClick={(e) => e.stopPropagation()}>
                {formatTime()}
            </Typography>
            <div className="timer-inputs">
                <TextField
                    label="Minutes"
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
                    disabled={timerOn}
                    variant="outlined"
                    onClick={(e) => e.stopPropagation()}
                />
                <TextField
                    label="Seconds"
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
                    disabled={timerOn}
                    variant="outlined"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            <div className="timer-buttons">
                <Button variant="contained" color="primary" onClick={startTimer}>
                    {timerOn ? 'Pause' : 'Start'}
                </Button>
                <Button variant="contained" color="secondary" onClick={resetTimer}>
                    Reset
                </Button>
                
            </div>
        </div>
    );
};

export default Timer;
