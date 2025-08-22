import { useState, useEffect } from "react";
import Styles from "../styles/navbar.module.css";
import { logo } from "../assets/data";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const apiBase = import.meta.env.VITE_API_URL;
  const [wordings, setWordings] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const path = window.location.pathname;
    setActiveTab(path);
  }, []);

  const isActive = (path: string) => {
    return activeTab === path ? Styles.active : "";
  };
  return (
    <>
      <div className={Styles.navbar}>
        <div
          className={Styles.navbar_left_content}
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className={Styles.navbar_img} />
        </div>
        <div className={Styles.navbar_left_heading}>
          <h2 className={Styles.navbar_left_heading_content1}>
            {wordings.navbar_header}
          </h2>
          <h4 className={Styles.navbar_left_heading_content2}>
            {wordings.navbar_subtitle}
          </h4>
        </div>
        <div className={Styles.navbar_right_content}>
          <a href="/" className={isActive("/")}>
            {wordings.home}
          </a>
          <a href="/projects" className={isActive("/projects")}>
            {wordings.our_projects}
          </a>
          <a href="/gallery" className={isActive("/gallery")}>
            {wordings.our_gallery}
          </a>
          <a href="/aboutus" className={isActive("/aboutus")}>
            {wordings.about_us}
          </a>
          <a href="/contactus" className={isActive("/contactus")}>
            {wordings.contact_us}
          </a>
        </div>
        <div className={Styles.menu}>
          <MenuOutlined onClick={toggleCollapsed} />
        </div>
      </div>
      {collapsed === true ? (
        <div className={Styles.menu_content}>
          <a href="/" className={isActive("/")}>
            {wordings.home}
          </a>
          <a href="/projects" className={isActive("/projects")}>
            {wordings.our_projects}
          </a>
          <a href="/gallery" className={isActive("/gallery")}>
            {wordings.our_gallery}
          </a>
          <a href="/aboutus" className={isActive("/aboutus")}>
            {wordings.about_us}
          </a>
          <a href="/contactus" className={isActive("/contactus")}>
            {wordings.contact_us}
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
