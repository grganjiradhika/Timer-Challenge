import { useState, useRef, useEffect, forwardRef } from 'react';
import ResultModal from './ResultModal.jsx';

const TimerChallenge = forwardRef(function TimerChallenge({ title, targetTime }, ref) {
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const [expiredMessage, setExpiredMessage] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (timeRemaining <= 0 && timerStarted) {
            clearInterval(timer.current);
            setTimerStarted(false);
            setTimerExpired(true);
            setExpiredMessage(`${title} - Time is up!`);
            dialog.current.open();
        }
    }, [timeRemaining, timerStarted, title]);

    useEffect(() => {
        if (timerStarted) {
            timer.current = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 10);
            }, 10);
            return () => clearInterval(timer.current);
        }
    }, [timerStarted]);

    function handleStart() {
        setTimerStarted(true);
        setTimerExpired(false);
    }

    function handleStop() {
        clearInterval(timer.current);
        setTimerStarted(false);
        setTimerExpired(false);
        dialog.current.close();
    }

    function handleScoreIncrease() {
        if (timerStarted && !timerExpired) {
            setScore(prevScore => prevScore + 1);
        }
    }


    return (
        <>
            <ResultModal ref={dialog} result={expiredMessage} />
            <section className="challenge">
                <h2>{title}</h2>
                {timerExpired && <p className="challenge-time">{expiredMessage}</p>}
                <p className="challenge-time">
                    {Math.ceil(timeRemaining / 1000)} second{Math.ceil(timeRemaining / 1000) > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                    {timerStarted && !timerExpired && (
                        <button onClick={handleScoreIncrease}>
                            Increase Score
                        </button>
                    )}
                </p>
                <p>Score: {score}</p>
                <p className={timerStarted ? 'active' : undefined}>

                    {timerStarted ? 'Time is running...' : ' Timer inactive'}
                </p>

            </section>
        </>
    );
});

export default TimerChallenge;
// shows time remianing, start/stop button, and score once time finishes popup will show up with message
// and score will be shown in the popup as well as in the challenge section itself  and score will be increased
// only if timer is running and time is not expired and score will be shown in the challenge section itself
