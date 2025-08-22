import { Carousel } from "antd";
import EventCalendar from "./EventCalendar";

type EventCalendarProps = {
  close?: () => void;
};

const events = [
  {
    title: "Bird Rescue Camp",
    targetDate: "2025-12-31T23:59:59",
    location: "Chennai",
  },
  {
    title: "Wildlife Awareness Drive",
    targetDate: "2025-11-15T09:00:00",
    location: "Chennai",
  },
  {
    title: "Eco Protection Workshop",
    targetDate: "2025-09-20T18:00:00",
    location: "Chennai",
  },
  {
    title: "Green Earth Initiative",
    targetDate: "2025-10-05T10:00:00",
    location: "Chennai",
  },
];

const EventCarousel = (Props: EventCalendarProps) => {

    const { close } = Props;
  return (
    <div style={{ maxWidth: 650, margin: "2rem auto" }}>
      <Carousel autoplay dots infinite adaptiveHeight>
        {events.map((event, index) => (
          <div key={index}>
            <EventCalendar
              title={event.title}
              targetDate={event.targetDate}
              location={event.location}
              close={close}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default EventCarousel;
