import React, { FC, useState } from "react";
import { Button, Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGamepad,
  faStar,
  faArrowUpRightDots,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Index: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onSelectMenu = ({ key }: any) => {
    navigate(key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className={`${styles.sidebarCollapseButton} ${
          collapsed ? styles.collapsed : ""
        }`}
      >
        <Button
          type="text"
          icon={<FontAwesomeIcon icon={faBars} />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            color: "#fff",
          }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onSelect={onSelectMenu}
        items={[
          {
            key: "/",
            icon: <FontAwesomeIcon icon={faGamepad} />,
            label: "All games",
          },
          {
            key: "/favorite-games",
            icon: <FontAwesomeIcon icon={faStar} />,
            label: "Favorite games",
          },
          {
            key: "/games-margins",
            icon: <FontAwesomeIcon icon={faArrowUpRightDots} />,
            label: "Games margins",
          },
          {
            key: "/merchants",
            icon: <FontAwesomeIcon icon={faHandHoldingDollar} />,
            label: "Merchants",
          },
        ]}
      />
    </Sider>
  );
};

export default Index;
