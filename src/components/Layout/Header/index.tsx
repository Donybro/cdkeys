import React, { FC, useState } from "react";
import { Button, Layout, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import apiRequest from "../../../shared/utils/api/apiRequest";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const Index: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    try {
      setIsLoading(true);
      apiRequest.post("/logout");
      message.info("Logged out");
      setIsLoading(false);
      navigate("/login");
    } catch (e) {
      setIsLoading(false);
      message.error("Something get wrong");
    }
  };

  return (
    <div className={styles.appHeader}>
      <Header style={{ padding: 0, background: "#fff" }}>
        <div className={styles.actions}>
          <Button
            type={"link"}
            loading={isLoading}
            disabled={isLoading}
            icon={<LogoutOutlined />}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </Header>
    </div>
  );
};

export default Index;
