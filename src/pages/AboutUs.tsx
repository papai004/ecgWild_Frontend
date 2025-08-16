import { useEffect, useState } from "react";
import { Button } from "antd";
import Navbar from "../components/Navbar";
import Donation from "../components/donation/Donation";
import Footer from "../components/Footer";
import Styles from "../styles/aboutus.module.css";


// You'll need to import these images - add them to your assets folder
import { missionImg } from "../assets/data";
import { visionImg } from "../assets/data";
import { impactImg } from "../assets/data";
import { seekExpeditionImg } from "../assets/data";

// Team member photos - add these to your assets folder
import { saleemImg } from "../assets/data";
import { stephenImg } from "../assets/data";
import { saravananImg } from "../assets/data";
import { shaimaImg } from "../assets/data";
// Advisor photos
import { drAzeezImg } from "../assets/data";
import { drVijayImg } from "../assets/data";
import { drAnirudhaImg } from "../assets/data";
// Partner logos - add these to your assets folder
import { partner1Logo } from "../assets/data";
import { partner2Logo } from "../assets/data";
import { partner3Logo } from "../assets/data";

const AboutUs: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          // API delay
          await new Promise((resolve) => setTimeout(resolve, 600));
        } catch (err) {
          console.error("Error loading data:", err); 
        } finally {
        setLoading(false);
      }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading data...</div>;
    }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className={Styles.hero_container}>
        <div className={Styles.headingCard}>
          <h1>{wordings.about_us_title}</h1>
          <p>{wordings.about_us_subtitle}</p>
          <div className={Styles.headingCard_button}>
            <Button className={Styles.headingCard_btn} onClick={showDonation}>
              <b>Donate Now</b>
            </Button>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <section className={Styles.about_section}>
        <div className={Styles.container}>
          <div className={Styles.about_content}>
            <div className={Styles.about_text}>
              <p>{wordings.about_us_description_1}</p>
              <p>{wordings.about_us_description_2}</p>
              <p>{wordings.about_us_description_3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={Styles.mission_vision_section}>
        <div className={Styles.container}>
          <div className={Styles.section_header}>
            <h2>{wordings.mission_vision}</h2>
          </div>

          <div className={Styles.mission_vision_grid}>
            {/* Mission */}
            <div className={Styles.mission_card}>
              <div className={Styles.card_image}>
                <img src={missionImg} alt="Our Mission" />
              </div>
              <div className={Styles.card_content}>
                <h3>{wordings.mission_statement_part1}</h3>
                <p>{wordings.mission_statement_part2}</p>
                <p>{wordings.mission_statement_part3}</p>
              </div>
            </div>

            {/* Vision */}
            <div className={Styles.vision_card}>
              <div className={Styles.card_content}>
                <h3>{wordings.vision_statement_part1}</h3>
                <p>{wordings.vision_statement_part2}</p>
                <p>{wordings.vision_statement_part3}</p>
              </div>
              <div className={Styles.card_image}>
                <img src={visionImg} alt="Our Vision" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEEK Expeditions Section */}
      <section className={Styles.seek_section}>
        <div className={Styles.container}>
          <div className={Styles.seek_content}>
            <div className={Styles.seek_image}>
              <img src={seekExpeditionImg} alt="SEEK Expeditions" />
            </div>
            <div className={Styles.seek_text}>
              <h2>{wordings.seek_expeditions_part1}</h2>
              <p>{wordings.seek_expeditions_part2}</p>
              <p>{wordings.seek_expeditions_part3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className={Styles.impact_section}>
        <div className={Styles.container}>
          <div className={Styles.impact_content}>
            <div className={Styles.impact_text}>
              <h2>{wordings.our_impact_part1}</h2>
              <p>{wordings.our_impact_part2}</p>
              <p>{wordings.our_impact_part3}</p>
            </div>
            <div className={Styles.impact_image}>
              <img src={impactImg} alt="Our Impact" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={Styles.team_section}>
        <div className={Styles.container}>
          <div className={Styles.section_header}>
            <h2>{wordings.our_team_part1}</h2>
            <p>{wordings.our_team_part2}</p>
          </div>

          <div className={Styles.team_grid}>
            <div className={Styles.team_member}>
              <div className={Styles.member_image}>
                <img src={saleemImg} alt="Saleem" />
              </div>
              <div className={Styles.member_info}>
                <h4>{wordings.membername1}</h4>
                <p className={Styles.member_role}>{wordings.designation1}</p>
              </div>
            </div>

            <div className={Styles.team_member}>
              <div className={Styles.member_image}>
                <img src={stephenImg} alt="Stephen" />
              </div>
              <div className={Styles.member_info}>
                <h4>{wordings.membername2}</h4>
                <p className={Styles.member_role}>{wordings.designation2}</p>
              </div>
            </div>

            <div className={Styles.team_member}>
              <div className={Styles.member_image}>
                <img src={saravananImg} alt="Saravanan" />
              </div>
              <div className={Styles.member_info}>
                <h4>{wordings.membername3}</h4>
                <p className={Styles.member_role}>{wordings.designation3}</p>
              </div>
            </div>

            <div className={Styles.team_member}>
              <div className={Styles.member_image}>
                <img src={shaimaImg} alt="Shaima" />
              </div>
              <div className={Styles.member_info}>
                <h4>{wordings.membername4}</h4>
                <p className={Styles.member_role}>{wordings.designation4}</p>
              </div>
            </div>
          </div>

          {/* Advisors Section */}
          <div className={Styles.advisors_section}>
            <h3>{wordings.our_advisors_title}</h3>
            <div className={Styles.advisors_grid}>
              <div className={Styles.advisor_member}>
                <div className={Styles.member_image}>
                  <img src={drAzeezImg} alt="Dr. P A Azeez" />
                </div>
                <div className={Styles.member_info}>
                  <h4>{wordings.advisor_name1}</h4>
                  <p className={Styles.member_role}>
                    {wordings.advisor_designation1}
                  </p>
                </div>
              </div>

              <div className={Styles.advisor_member}>
                <div className={Styles.member_image}>
                  <img src={drVijayImg} alt="Dr. Vijay Kumar" />
                </div>
                <div className={Styles.member_info}>
                  <h4>{wordings.advisor_name2}</h4>
                  <p className={Styles.member_role}>
                    {wordings.advisor_designation2}
                  </p>
                </div>
              </div>

              <div className={Styles.advisor_member}>
                <div className={Styles.member_image}>
                  <img src={drAnirudhaImg} alt="Dr. Anirudha" />
                </div>
                <div className={Styles.member_info}>
                  <h4>{wordings.advisor_name3}</h4>
                  <p className={Styles.member_role}>
                    {wordings.advisor_designation3}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className={Styles.collaboration_section}>
        <div className={Styles.container}>
          <div className={Styles.section_header}>
            <h2>{wordings.collaboration_for_conservation_title}</h2>
            <p>{wordings.collaboration_for_conservation_description1}</p>
            <p>{wordings.collaboration_for_conservation_description2}</p>
          </div>

          <div className={Styles.partners_grid}>
            <div className={Styles.partner_logo}>
              <img src={partner1Logo} alt="Partner 1" />
            </div>
            <div className={Styles.partner_logo}>
              <img src={partner2Logo} alt="Partner 2" />
            </div>
            <div className={Styles.partner_logo}>
              <img src={partner3Logo} alt="Partner 3" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={Styles.cta_section}>
        <div className={Styles.container}>
          <div className={Styles.cta_content}>
            <h2>{wordings.join_our_movement_title}</h2>
            <p>
              {wordings.join_our_movement_description}
            </p>
            <p>
              <strong>
                {wordings.join_our_movement_tagline}
              </strong>
            </p>
          </div>
        </div>
      </section>

      <Donation open={isModalOpen} close={handleCloseModal} />
      <Footer />
    </>
  );
};

export default AboutUs;
