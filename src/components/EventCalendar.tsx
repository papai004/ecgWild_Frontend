import { CloseCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Styles from "../styles/eventcalendar.module.css";
import CountdownTimer from "./CountdownTimer";

type EventCalendarProps = {
  title: string;
  targetDate: string;
  location: string;
  close?: () => void;
};

const EventCalendar = (props: EventCalendarProps) => {
  const { title, targetDate, location, close } = props;

  const eventDate = new Date(targetDate).toLocaleDateString("en-GB");

  return (
    <Card
      className={Styles.card_container}
      title={<div className={Styles.card_title}>{title}</div>}
      extra={
        close && (
            <CloseCircleOutlined className={Styles.closebtn} onClick={close} />
        )
      }
    >
      <p className={Styles.event_date}>📅 {eventDate}</p>
      <p className={Styles.event_location}>📍 {location}</p>

      <div className={Styles.container} style={{ width: "100%" }}>
        <CountdownTimer targetDate={targetDate} />
      </div>
    </Card>
  );
};

export default EventCalendar;
