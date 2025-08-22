import { useEffect, useState } from "react";
import { Button } from "antd";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";
import Donation from "../components/donation/Donation";
import ContactForm from "../components/ContactForm";
import Styles from "../styles/contactus.module.css";
import Footer from "../components/Footer";
import { locationImg } from "../assets/data";
import { useEventContext } from "../context/EventContext";


const ContactUs: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [wordings, setWordings] = useState<{ [key: string]: string }>({});
  const { openEvent } = useEventContext();
  
  useEffect(() => {
    async function fetchWordings() {
      try {
        const res = await fetch(`${apiBase}/api/wordings`);
        const data = await res.json();
        const map: { [key: string]: string } = {};
        data.forEach((item: { KeyName: string; Value: string }) => {
          map[item.KeyName] = item.Value;
        });
        setWordings(map);
      } catch (error) {
        console.error("Error fetching wordings:", error);
      }
    }
    fetchWordings();
  }, []);

  const showDonation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (data: boolean) => {
    setIsModalOpen(data);
  };
  return (
    <>
      <Navbar />
      <div className={Styles.container}>
        <div className={Styles.headingCard}>
          <h1>{wordings.contact_us_title}</h1>
          <p>{wordings.contact_us_subtitle}</p>
          <div className={Styles.headingCard_button}>
            <Button className={Styles.headingCard_btn} onClick={showDonation}>
              <b>{wordings.button_donate_now}</b>
            </Button>
            <Button
              style={{ marginLeft: 6 }}
              className={Styles.headingCard_btn}
              onClick={openEvent}
            >
              <b>{wordings.button_events}</b>
            </Button>
          </div>
        </div>
      </div>
      <Donation open={isModalOpen} close={handleCloseModal} />
      <div className={Styles.contact_form}>
        <ContactForm />
        <div className={Styles.detail}>
          <img src={locationImg} style={{ width: "50%" }} />
          <div className={Styles.details_text} style={{ width: "50%" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <PhoneOutlined style={{ fontSize: "24px", color: "#4CAF50" }} />
              <p>{wordings.contact_info_phone}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <MailOutlined style={{ fontSize: "24px", color: "#4CAF50" }} />
              <p>{wordings.contact_info_email}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <EnvironmentOutlined
                style={{ fontSize: "24px", color: "#4CAF50" }}
              />
              <p>{wordings.contact_info_address}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
