import React from "react";
import { Tabs } from "antd";
import Styles from "../styles/adminpanel.module.css";
import AdminWordings from "../components/AdminWordings";

const AdminPanel: React.FC = () => {
  const apiBase = import.meta.env.VITE_API_URL;

  return (
    <div className={Styles.adminpanel}>
      <h1 className={Styles.adminTitle}>Admin Panel</h1>
      <div className={Styles.tabsContainer}>
        <Tabs className={Styles.centerTabs}>
          <Tabs.TabPane tab="Wordings">
            <AdminWordings apiBase={apiBase} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
