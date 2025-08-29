import React, { useState } from "react";
import { Tabs } from "antd";
import Styles from "../styles/adminpanel.module.css";
import AdminWordings from "../components/AdminWordings";
import PasswordModal from "../components/PasswordModal";

const AdminPanel: React.FC = () => {
  const apiBase = import.meta.env.VITE_API_URL;
  const [authorized, setAuthorized] = useState(false);

  return (
    <>
      <PasswordModal visible={!authorized} onSuccess={() => setAuthorized(true)} />

      {authorized && (
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
      )}
    </>
  );
};

export default AdminPanel;
