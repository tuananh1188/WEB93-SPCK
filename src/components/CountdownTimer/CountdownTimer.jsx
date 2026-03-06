import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const CountdownTimer = ({ targetDate }) => {
    const { box, title, countDown } = styles;

    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        if (difference > 0) {
            return {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Mins: Math.floor((difference / 1000 / 60) % 60),
                Secs: Math.floor((difference / 1000) % 60)
            };
        }
        return {};
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => String(number).padStart(2, '0');

    if (Object.keys(timeLeft).length === 0) {
        return <span>Time's up!</span>;
    }

    return (
        <div className={countDown}>
            {Object.keys(timeLeft).map((interval) => (
                <span key={interval} className={box}>
                    {formatNumber(timeLeft[interval])}{' '}
                    <span className={title}>{interval}</span>
                </span>
            ))}
        </div>
    );
};

export default CountdownTimer;
