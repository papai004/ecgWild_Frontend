import CustomCard from "../components/CustomCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Styles from "../styles/projects.module.css";
import ourProjects1 from "../assets/project1.jpg";
import ourProjects2 from "../assets/project2.jpg";
import ourProjects3 from "../assets/project3.jpg";
import ourProjects4 from "../assets/project4.png";
import { Button } from "antd";
import { useState } from "react";
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
} from "../assets/data";

const OurProjects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          Card2_Heading={ourProjectsHeading2}
          Card2_Paragraph={ourProjectsParagraph2}
          Card3_Heading={ourProjectsHeading3}
          Card3_Paragraph={ourProjectsParagraph3}
          Card4_Heading={ourProjectsHeading4}
          Card4_Paragraph={ourProjectsParagraph4}
          showOrNot={true}
        />
      </div>
      <Footer />
    </>
  );
};

export default OurProjects;
