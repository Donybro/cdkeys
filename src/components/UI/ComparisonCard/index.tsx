import React, { FC } from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import MerchantItem from "../MerchantItem";

interface ComparisonCardProps {
  merchantOne: any;
  merchantTwo: any;
  withShadow?: boolean;
}

const Index: FC<ComparisonCardProps> = ({
  withShadow,
  merchantOne,
  merchantTwo,
}) => {
  return (
    <div
      className={`${styles.uiComparisonCard} ${
        withShadow ? "with-shadow" : ""
      }`}
    >
      <div className={styles.merchantOne}>
        <MerchantItem
          name={merchantOne?.name}
          logoSlug={merchantOne?.logoSlug}
        />
      </div>
      <FontAwesomeIcon icon={faArrowsLeftRight} />
      <div className={styles.merchantTwo}>
        <MerchantItem
          name={merchantTwo?.name}
          logoSlug={merchantTwo?.logoSlug}
        />
      </div>
    </div>
  );
};

export default Index;
