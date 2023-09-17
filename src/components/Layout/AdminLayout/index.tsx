import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Outlet } from "react-router-dom";
import classes from "./admin-layout.module.scss";
import Header from "../Header";
import Sidebar from "../Sidebar";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout hasSider className={classes.adminLayoutWrapper}>
      <Sidebar />
      <Layout>
        <Header />
        <Content className={classes.adminLayoutContent}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
