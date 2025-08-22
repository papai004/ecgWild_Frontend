import React, { createContext, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface EventContextType {
  showEvent: boolean;
  openEvent: () => void;
  closeEvent: () => void;
  eventRef: React.RefObject<HTMLDivElement | null>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showEvent, setShowEvent] = useState(false);
  const eventRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const openEvent = () => {
    setShowEvent(true);
    navigate("/");
    setTimeout(() => {
      eventRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const closeEvent = () => setShowEvent(false);

  return (
    <EventContext.Provider value={{ showEvent, openEvent, closeEvent, eventRef }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEventContext must be used within EventProvider");
  return context;
};
