import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const Timer = () => {
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
            setMinutes(0);
            setSeconds(0);
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
        setTimeInSeconds(0);
        setMinutes(0);
        setSeconds(0);
        setTimerOn(false);
    };

    const formatTime = () => {
        const mins = Math.floor(timeInSeconds / 60);
        const secs = timeInSeconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            <Typography>{formatTime()}</Typography>
            <div>
                <TextField
                    label="Minutes"
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
                    disabled={timerOn}
                />
                <TextField
                    label="Seconds"
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
                    disabled={timerOn}
                />
            </div>
            <div>
                <Button onClick={!timerOn ? startTimer : stopTimer}>
                    {timerOn ? 'Pause' : 'Start'}
                </Button>
                <Button onClick={resetTimer}>Reset</Button>
            </div>
        </div>
    );
};

export default Timer;
