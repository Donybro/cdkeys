import React, { FC } from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";

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
      <div className={styles.merchantOne + " webp"}>
        <span className={`store store-16-${merchantOne?.logoSlug}`}></span>
        {merchantOne?.name}
      </div>
      <FontAwesomeIcon icon={faArrowsLeftRight} />
      <div className={styles.merchantTwo + " webp"}>
        <span className={`store store-16-${merchantTwo?.logoSlug}`}></span>
        {merchantTwo?.name}
      </div>
    </div>
  );
};

export default Index;
