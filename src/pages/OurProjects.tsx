import { useEffect, useState } from "react";
import CustomCard from "../components/CustomCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Styles from "../styles/projects.module.css";
import ourProjects1 from "../assets/image1.png";
import ourProjects2 from "../assets/img1.jpg";
import ourProjects3 from "../assets/study.jpg";
import ourProjects4 from "../assets/img8.jpg";
import ourProjects5 from "../assets/img4.jpg";
import Donation from "../components/donation/Donation";
import {
  projectHeading,
  projectParagraph,
  ourProjectsHeading1,
  ourProjectsHeading2,
  ourProjectsHeading3,
  ourProjectsHeading4,
  ourProjectsParagraph1,
  ourProjectsParagraph2,
  ourProjectsParagraph3,
  ourProjectsParagraph4,
  ourProjectsHeading5,
  ourProjectsParagraph5,
  carouselItems,
} from "../assets/data";
import CustomCarousel from "../components/CustomCarousel";
import { Button } from "antd";


interface CarouselItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

const OurProjects: React.FC = () => {

    const [items, setItems] = useState<CarouselItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          await new Promise((resolve) => setTimeout(resolve, 500));
  
          setItems(carouselItems);
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
  
    if (loading) {
      return <div>Loading data...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

  const heading = "Recent Projects";

  return (
    <>
      <Navbar />
      <div className={Styles.container}>
        <div className={Styles.headingCard}>
          <h1>{projectHeading}</h1>
          <p>{projectParagraph}</p>
          <div className={Styles.headingCard_button}>
            <Button className={Styles.headingCard_btn} onClick={showDonation}>
              <b>Donate Now</b>
            </Button>
          </div>
        </div>
        <Donation open={isModalOpen} close={handleCloseModal} />
        <CustomCard
          Card1_Heading={ourProjectsHeading1}
          card1_Paragraph={ourProjectsParagraph1}
          image1={ourProjects1}
          image2={ourProjects2}
          image3={ourProjects3}
          image4={ourProjects4}
          image5={ourProjects5}
          Card2_Heading={ourProjectsHeading2}
          Card2_Paragraph={ourProjectsParagraph2}
          Card3_Heading={ourProjectsHeading3}
          Card3_Paragraph={ourProjectsParagraph3}
          Card4_Heading={ourProjectsHeading4}
          Card4_Paragraph={ourProjectsParagraph4}
          Card5_Heading={ourProjectsHeading5}
          Card5_Paragraph={ourProjectsParagraph5}
          showOrNot={true}
        />
        <CustomCarousel heading={heading} items={items} />
      </div>
      <Footer />
    </>
  );
};

export default OurProjects;
