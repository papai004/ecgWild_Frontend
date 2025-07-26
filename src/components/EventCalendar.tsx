import { CloseCircleOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import Styles from "../styles/eventcalendar.module.css";
import CountdownTimer from "./CountdownTimer";

type EventCalendarProps = {
  title?: string;
  close?: () => void;
};

const EventCalender = (Props: EventCalendarProps) => {
  const { title, close } = Props;

  return (
    <Card
      className={Styles.card_container}
      title={<div className={Styles.card_title}>{title}</div>}
      extra={
        <Tooltip placement="top" title="close">
          <CloseCircleOutlined className={Styles.closebtn} onClick={close} />
        </Tooltip>
      }
    >
      <div className={Styles.container} style={{ width: "100%" }}>
        <CountdownTimer targetDate="2025-12-31T23:59:59" />
      </div>
    </Card>
  );
};

export default EventCalender;
