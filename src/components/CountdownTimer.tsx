import React, { useEffect, useState } from "react";
import Styles from "../styles/countdowntimer.module.css";

type CountdownTimerProps = {
  targetDate: string;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={Styles.timer_container}>
      <div className={Styles.timer_segment}>
        <p className={Styles.value}>{timeLeft.days}</p>
        <p className={Styles.label}>Days</p>
      </div>
      <div className={Styles.timer_segment}>
        <p className={Styles.value}>{timeLeft.hours}</p>
        <p className={Styles.label}>Hours</p>
      </div>
      <div className={Styles.timer_segment}>
        <p className={Styles.value}>{timeLeft.minutes}</p>
        <p className={Styles.label}>Minutes</p>
      </div>
      <div className={Styles.timer_segment}>
        <p className={Styles.value}>{timeLeft.seconds}</p>
        <p className={Styles.label}>Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
