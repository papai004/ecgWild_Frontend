import { Button } from "antd";
import Carousel from "../components/Carousel";
import img1 from "../assets/carousel_img1.jpg";
import img2 from "../assets/bird.png";
import img3 from "../assets/tree.jpeg";
import Navbar from "../components/Navbar";
import CustomHeading from "../components/HeadingCard";
import Styles from "../styles/home.module.css";
import getInvolved from "../assets/getInvolved.svg";
import Footer from "../components/Footer";
import { useState } from "react";
import Donation from "../components/donation/Donation";
import CustomCard from "../components/CustomCard";
import aboutus1 from "../assets/aboutus1.png";
import aboutus2 from "../assets/aboutus2.jpg";
import aboutus3 from "../assets/aboutus3.jpg";
import {
  heading1,
  heading2,
  heading3,
  paragraph,
  aboutusHeading1,
  aboutusHeading2,
  aboutusHeading3,
  aboutusParagraph1Bold,
  aboutusParagraph1,
  aboutusParagraph2Bold,
  aboutusParagraph2,
  aboutusParagraph3,
} from "../assets/data";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDonation = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = (data: boolean) => {
    setIsModalOpen(data);
  };

  return (
    <>
      <div className={Styles.container}>
        <Navbar />
        <Carousel
          image1={img1}
          image2={img2}
          image3={img3}
          heading1={heading1}
          heading2={heading2}
          heading3={heading3}
        />
        <CustomHeading
          heading="About Us"
          paragraph={paragraph}
          backgroundColor="white"
        >
          <CustomCard
            Card1_Heading={aboutusHeading1}
            card1_Paragraph_Bold={aboutusParagraph1Bold}
            card1_Paragraph={aboutusParagraph1}
            image1={aboutus1}
            image2={aboutus2}
            image3={aboutus3}
            Card2_Heading={aboutusHeading2}
            card2_Paragraph_Bold={aboutusParagraph2Bold}
            Card2_Paragraph={aboutusParagraph2}
            Card3_Heading={aboutusHeading3}
            Card3_Paragraph={aboutusParagraph3}
            showOrNot={false}
          />
        </CustomHeading>
        <CustomHeading
          heading="Get Involved"
          paragraph={paragraph}
          backgroundColor="#F9FAFB"
        >
          <div className={Styles.getinvolved}>
            <div className={Styles.getinvolved_text}>
              <div className={Styles.getinvolved_text_inner}>
                <h2>Donate Now !</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                  sapiente culpa asperiores quas dolores.
                </p>
                <Button
                  className={Styles.getinvolved_text_btn}
                  onClick={showDonation}
                >
                  <b>Donate Now</b>
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
