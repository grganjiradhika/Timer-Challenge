// import { useState, useRef, forwardRef } from 'react';
// import ResultModal from './ResultModal.jsx';
// const TimerChallenge = forwardRef(function TimerChallenge({ title, targetTime }, ref) {
//     const timer = useRef();
//     const dialog = useRef();
//     const [timerStarted, setTimerStarted] = useState(false);
//     const [timerExpired, setTimerExpired] = useState(false);

//     function handleStart() {
//         timer.current = setTimeout(() => {
//             setTimerExpired(true);
//             dialog.current.showModal();
//         }, targetTime * 1000);
//         setTimerStarted(true);
//     }

//     function handleStop() {
//         clearTimeout(timer.current);
//         setTimerStarted(false);
//         setTimerExpired(false);
//     }
//     return (
//         <>
//             <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
//             <section className="challenge">
//                 <h2>{title}</h2>
//                 {timerExpired && <p className="challenge-time">Time is up!</p>}
//                 <p className="challenge-time">
//                     {targetTime} second{targetTime > 1 ? 's' : ''}
//                 </p>
//                 <p>
//                     <button onClick={timerStarted ? handleStop : handleStart}>
//                         {timerStarted ? 'Stop' : 'Start'} Challenge
//                     </button>
//                 </p>
//                 <p className={timerStarted ? 'active' : undefined}>
//                     {timerStarted ? 'Time is running...' : ' Timer inactive'}
//                 </p>
//             </section>
//         </>
//     );
// });
// export default TimerChallenge;
import { useState, useRef, useEffect, forwardRef } from 'react';
import ResultModal from './ResultModal.jsx';

const TimerChallenge = forwardRef(function TimerChallenge({ title, targetTime }, ref) {
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const [expiredMessage, setExpiredMessage] = useState('');

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
        setTimeRemaining(targetTime * 1000);
        dialog.current.close();
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
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Time is running...' : ' Timer inactive'}
                </p>
            </section>
        </>
    );
});

export default TimerChallenge;



