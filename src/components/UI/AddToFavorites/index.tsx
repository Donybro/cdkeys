import React, { FC } from "react";
import { Button, Rate, Spin } from "antd";
import styles from "./style.module.scss";

interface AddToFavoritesProps {
  onClick: any;
  isLoading?: boolean;
}

const Index: FC<AddToFavoritesProps> = ({ onClick, isLoading }) => {
  return (
    <div onClick={onClick} className={styles.addToFavoritesButton}>
      <Button loading={isLoading} disabled={isLoading}>
        <Rate disabled={isLoading} count={1} />
      </Button>
    </div>
  );
};

export default Index;
