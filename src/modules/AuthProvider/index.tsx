import React, { FC, useContext } from "react";
import { AppContext } from "../../context";
import apiRequest from "../../shared/utils/api/apiRequest";

const Index: FC = ({ children }: any) => {
  const { activeUser, setActiveUser } = useContext(AppContext);

  const getUser = async () => {
    const { data } = await apiRequest.get("/user");
    if (data) {
      setActiveUser(data);
    }
  };

  if (!activeUser) {
    getUser();
  }
  if (activeUser) {
    return <div>{children}</div>;
  }
};

export default Index;
