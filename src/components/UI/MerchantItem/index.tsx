import React, { FC } from "react";
import styles from "./style.module.scss";

interface MerchantItemProps {
  name: string;
  logoSlug: string;
}

const Index: FC<MerchantItemProps> = ({ name, logoSlug }) => {
  return (
    <div className={styles.merchnat + " webp"}>
      <span className={`store store-16-${logoSlug}`}></span>
      {name}
    </div>
  );
};

export default Index;
