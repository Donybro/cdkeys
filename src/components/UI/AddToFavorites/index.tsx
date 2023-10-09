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
        <span onClick={(e) => onClick(e)}>
          <Rate disabled={isLoading} count={1} />
        </span>
      )}
    </div>
  );
};

export default Index;
