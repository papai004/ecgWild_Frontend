import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CustomCarousel from "../components/CustomCarousel";
import Styles from "../styles/gallery.module.css";
import Donation from "../components/donation/Donation";
import Footer from "../components/Footer";
import { Button } from "antd";
import MediaGallery from "../components/MediaGallery";
import { useEventContext } from "../context/EventContext";
import { spinningLogo } from "../assets/data";
import {
  activity1,
  activity2,
  activity3,
  activity4,
  activity5,
} from "../assets/data";

interface CarouselItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

const OurGallery: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const heading = "Recent Activities";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setError(null);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", 
          }}
        >
          <img src={spinningLogo} alt="Loading..." />
        </div>
      );
    }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const items: CarouselItem[] = [
    {
      id: 101,
      title: wordings.generic_place_name_label1 || "Name of the Place1",
      content:
        wordings.generic_place_description_label1 ||
        "Description of the place 1",
      imageUrl: activity1,
    },
    {
      id: 102,
      title: wordings.generic_place_name_label2 || "Name of the Place2",
      content:
        wordings.generic_place_description_label2 ||
        "Description of the place 2",
      imageUrl: activity2,
    },
    {
      id: 103,
      title: wordings.generic_place_name_label3 || "Name of the Place3",
      content:
        wordings.generic_place_description_label3 ||
        "Description of the place 3",
      imageUrl: activity3,
    },
    {
      id: 104,
      title: wordings.generic_place_name_label4 || "Name of the Place4",
      content:
        wordings.generic_place_description_label4 ||
        "Description of the place 4",
      imageUrl: activity4,
    },
    {
      id: 105,
      title: wordings.generic_place_name_label5 || "Name of the Place5",
      content:
        wordings.generic_place_description_label5 ||
        "Description of the place 5",
      imageUrl: activity5,
    },
  ];

  return (
    <>
      <Navbar />
      <div className={Styles.container}>
        <div className={Styles.headingCard}>
          <h1>{wordings.our_gallery_title}</h1>
          <p>{wordings.our_projects_subtitle}</p>
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
        <Donation open={isModalOpen} close={handleCloseModal} />
        <CustomCarousel heading={heading} items={items} />
        <MediaGallery />
      </div>
      <Footer />
    </>
  );
};

export default OurGallery;
