import { useEffect, useRef } from "react";
import { Button } from "antd";
import Carousels from "../components/Carousel";
import { img1 } from "../assets/data";
import { img2 } from "../assets/data";
import { img3 } from "../assets/data";
import Navbar from "../components/Navbar";
import CustomHeading from "../components/HeadingCard";
import Styles from "../styles/home.module.css";
import { getInvolved } from "../assets/data";
import Footer from "../components/Footer";
import { useState } from "react";
import Donation from "../components/donation/Donation";
import CustomCard from "../components/CustomCard";
import { aboutus1 } from "../assets/data";
import { aboutus2 } from "../assets/data";
import { aboutus3 } from "../assets/data";
import EventCalender from "../components/EventCalendar";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const eventRef = useRef<HTMLDivElement | null>(null);
  const [wordings, setWordings] = useState<{ [key: string]: string }>({});
  const apiBase = import.meta.env.VITE_API_URL;
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
  const handleEvents = () => {
    setShowEvent(true);

    setTimeout(() => {
      eventRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const handleCloseEvent = () => {
    setShowEvent(false);
  };

  return (
    <>
      <div className={Styles.container}>
        <Navbar />
        <Carousels
          image1={img1}
          image2={img2}
          image3={img3}
          heading1={wordings.carousel1_title}
          heading2={wordings.carousel2_title}
          heading3={wordings.carousel3_title}
          showEvents={handleEvents}
        />
        <CustomHeading
          heading={wordings.about_us_heading}
          paragraph={wordings.about_us_subtitle}
          backgroundColor="white"
        >
          <CustomCard
            Card1_Heading={wordings.vision_title}
            card1_Paragraph_Bold={wordings.vision_subtitle}
            card1_Paragraph={wordings.vision_description}
            image1={aboutus1}
            image2={aboutus2}
            image3={aboutus3}
            Card2_Heading={wordings.mission_title}
            card2_Paragraph_Bold={wordings.mission_subtitle}
            Card2_Paragraph={wordings.mission_description}
            Card3_Heading={wordings.our_story_title}
            Card3_Paragraph={wordings.our_story_description}
            showOrNot={false}
          />
        </CustomHeading>
        {showEvent && (
          <div ref={eventRef}>
            <EventCalender
              title={wordings.bird_rescue_camp_title}
              close={handleCloseEvent}
            />
          </div>
        )}
        <CustomHeading
          heading={wordings.get_involved_title}
          paragraph={wordings.get_involved_subtitle}
          backgroundColor="#F9FAFB"
        >
          <div className={Styles.getinvolved}>
            <div className={Styles.getinvolved_text}>
              <div className={Styles.getinvolved_text_inner}>
                <h2>{wordings.home_bottom_title}</h2>
                <p>{wordings.home_bottom_subtitle}</p>
                <Button
                  className={Styles.getinvolved_text_btn}
                  onClick={showDonation}
                >
                  <b>{wordings.button_donate_now}</b>
                </Button>
              </div>
            </div>
            <img
              className={Styles.getinvolved_svg}
              src={getInvolved}
              alt="get involved"
              width="100"
              height="100"
            />
            <div className={Styles.getinvolved_img} />
          </div>
        </CustomHeading>
        <Donation open={isModalOpen} close={handleCloseModal} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
