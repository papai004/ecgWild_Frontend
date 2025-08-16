import { useEffect, useState } from "react";
import CustomCard from "../components/CustomCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Styles from "../styles/projects.module.css";
import { ourProjects1 } from "../assets/data";
import { ourProjects2 } from "../assets/data";
import { ourProjects3 } from "../assets/data";
import { ourProjects4 } from "../assets/data";
import { ourProjects5 } from "../assets/data";
import {
  activity1,
  activity2,
  activity3,
  activity4,
  activity5,
} from "../assets/data";
import Donation from "../components/donation/Donation";
import CustomCarousel from "../components/CustomCarousel";
import { Button } from "antd";

interface CarouselItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

const OurProjects: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [wordings, setWordings] = useState<{ [key: string]: string }>({});
  const showDonation = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = (data: boolean) => {
    setIsModalOpen(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // API delay
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setError(null);
      } catch (err) {
        console.error("Error loading carousel data:", err);
        setError("Failed to load carousel data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      } finally {
        setLoading(false);
      }
    }
    fetchWordings();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
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
          <h1>{wordings.carousel1_subtitle}</h1>
          <p>{wordings.our_projects_subtitle}</p>
          <div className={Styles.headingCard_button}>
            <Button className={Styles.headingCard_btn} onClick={showDonation}>
              <b>{wordings.button_donate_now}</b>
            </Button>
          </div>
        </div>
        <Donation open={isModalOpen} close={handleCloseModal} />
        <CustomCard
          Card1_Heading={wordings.project1_title}
          card1_Paragraph={wordings.project1_description}
          image1={ourProjects1}
          image2={ourProjects2}
          image3={ourProjects3}
          image4={ourProjects4}
          image5={ourProjects5}
          Card2_Heading={wordings.project2_title}
          Card2_Paragraph={wordings.project2_description}
          Card3_Heading={wordings.project3_title}
          Card3_Paragraph={wordings.project3_description}
          Card4_Heading={wordings.project4_title}
          Card4_Paragraph={wordings.project4_description}
          Card5_Heading={wordings.project5_title}
          Card5_Paragraph={wordings.project5_description}
          showOrNot={true}
        />
        <CustomCarousel heading={wordings.recent_projects_label} items={items} />
      </div>
      <Footer />
    </>
  );
};

export default OurProjects;
