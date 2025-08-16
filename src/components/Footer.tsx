import React, { useEffect, useState } from "react";
import Styles from '../styles/footer.module.css';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from "@ant-design/icons";


const Footer: React.FC = () => {
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
    return (
        <div className={ Styles.footer}>
            <p>{wordings.footer_copyright_prefix}<strong> {wordings.footer_copyright_website} </strong>{wordings.footer_copyright_suffix}</p>
            <div className={ Styles.footer_icons}>
            <FacebookOutlined style={{fontSize: 26}}/>
            <TwitterOutlined style={{fontSize: 26}}/>
            <LinkedinOutlined style={{fontSize: 26}}/>
            </div>
        </div>
    )
};

export default Footer;