import React, { FC, useContext } from "react";
import { AppContext } from "../../context";
import apiRequest from "../../shared/utils/api/apiRequest";

const Index: FC = ({ children }: any) => {
  const { activeUser, setActiveUser } = useContext(AppContext);

  const getUser = async () => {
    const resp = await apiRequest.get("/user");
  };

  if (!activeUser) {
    getUser();
  }
  return <div>{children}</div>;
};

export default Index;
