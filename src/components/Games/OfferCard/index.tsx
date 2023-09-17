import React, { FC } from "react";
import styles from "./style.module.scss";

const Index: FC = ({ merchantInfo, offerInfo, regionInfo, editionInfo }) => {
  const bestCoupon = offerInfo.price.eur.bestCoupon;
  const price = offerInfo.price.eur.price;
  const priceWithoutCoupon = offerInfo.price.eur.priceWithoutCoupon;
  const discountValue = offerInfo.price.eur.bestCoupon?.discountValue;

  return (
    <div className={styles.gameOffer}>
      <div className={`webp ${styles.content}`}>
        <div className={styles.merchantWrapper}>
          <div
            className={`store store-16-${merchantInfo.logoSlug} ${styles.logo}`}
          ></div>
          <div className={styles.merchantName}>{merchantInfo.name}</div>
        </div>
        <div className={styles.platformWrapper}>
          <span className={styles.region}>{regionInfo.name}</span>
          <span
            className={`${styles.platformLogo} sprite sprite-30-${offerInfo.platform}`}
          ></span>
        </div>
        <div className={styles.editionWrapper}>
          {/*<span>{editionInfo.name}</span>*/}
          {priceWithoutCoupon && (
            <span className={styles.priceWithoutCoupon}>
              {priceWithoutCoupon}€
            </span>
          )}
        </div>
        <div className={styles.priceWrapper}>
          <div className={styles.price}>{price}€</div>
        </div>

        {bestCoupon && (
          <div className={styles.couponWrapper}>
            <span className={styles.discountValue}>-{discountValue}%</span>
            <span className={styles.code}>{bestCoupon.code}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
