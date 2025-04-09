import { useState } from 'react';
import Styles from '../styles/navbar.module.css';
import logo from '../assets/logo.jpg';
import { MenuOutlined } from '@ant-design/icons';



const Navbar = () => {

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

    return (
        <>
            <div className={Styles.navbar}>
                <div className={Styles.navbar_left_content}>
                    <img src={logo} alt="logo" className={Styles.navbar_img} />
                </div>
                <div className={Styles.navbar_left_heading}>
                    <h2 className={Styles.navbar_left_heading_content1}>Environment Conservation Group</h2>
                    <h5 className={Styles.navbar_left_heading_content2}>Feel the pulse of nature</h5>
                </div>
                <div className={Styles.navbar_right_content}>
                    <a href='/'>Home</a>
                    <a href='/projects'>Our Projects</a>
                    <a href='/gallery'>Our Gallery</a>
                    <a href='/contactus'>Contact Us</a>
                </div>
                <div className={Styles.menu}>
                    <MenuOutlined onClick={toggleCollapsed} />
                </div>
            </div>
            {collapsed === true ? (
                <div className={Styles.menu_content}>
                    <a href='/'>Home</a>
                    <a href='/projects'>Our Projects</a>
                    <a href='/gallery'>Our Gallery</a>
                    <a href='/contactus'>Contact Us</a>
                </div>
            ) : ""}
        </>
    )
};

export default Navbar;
