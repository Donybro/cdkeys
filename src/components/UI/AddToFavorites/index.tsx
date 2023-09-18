import React, { FC } from "react";
import { Rate, Spin } from "antd";
import styles from "./style.module.scss";

interface AddToFavoritesProps {
  onClick: any;
  isLoading?: boolean;
}

const Index: FC<AddToFavoritesProps> = ({ onClick, isLoading }) => {
  return (
    <div className={styles.addToFavoritesButton}>
      {isLoading ? (
        <Spin spinning={isLoading} />
      ) : (
        <Rate onChange={() => onClick()} disabled={isLoading} count={1} />
      )}
    </div>
  );
};

export default Index;
