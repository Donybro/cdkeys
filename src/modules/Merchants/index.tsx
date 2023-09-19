import React, { FC, useState } from "react";
import useMerchants from "../../hooks/useMerchants";
import MerchantItem from "../../components/UI/MerchantItem";
import { Button } from "antd";
import styles from "./style.module.scss";
import ComparisonCard from "../../components/UI/ComparisonCard";

const Index: FC = () => {
  const {
    getExistPairSuggestionsForSelectedMerchant,
    merchantsList,
    merchantPairs,
  } = useMerchants();

  const [firstSelectedMerchant, setFirstSelectedMerchant] = useState<any>();
  const [secondSelectedMerchant, setSecondSelectedMerchant] = useState<any>();

  const [existPairsForSelectedMerchant, setExistPairsForSelectedMerchant] =
    useState([]);

  const onSelectMerchant = (merchant_id: any) => {
    if (existPairsForSelectedMerchant.includes(merchant_id)) {
      return null;
    }
    if (!firstSelectedMerchant) {
      setFirstSelectedMerchant(merchant_id);
      setExistPairsForSelectedMerchant(
        getExistPairSuggestionsForSelectedMerchant(merchant_id),
      );
    } else {
      setSecondSelectedMerchant(merchant_id);
    }
  };

  const clearSelectedMerchants = () => {
    setFirstSelectedMerchant("");
    setSecondSelectedMerchant("");
    setExistPairsForSelectedMerchant([]);
  };

  const submitMerchants = async () => {
    console.log(firstSelectedMerchant, secondSelectedMerchant);
  };

  return (
    <div>
      <h1>List of merchants</h1>
      <div className={styles.merchantsList}>
        {merchantsList.map((merchant) => (
          <div
            className={`${styles.merchant} ${
              existPairsForSelectedMerchant.includes(merchant.merchant_id)
                ? styles.disabled
                : ""
            } ${
              firstSelectedMerchant === merchant.merchant_id
                ? styles.selected
                : null
            } ${
              secondSelectedMerchant === merchant.merchant_id
                ? styles.selected
                : null
            }`}
            onClick={() => onSelectMerchant(merchant.merchant_id)}
          >
            <MerchantItem name={merchant.name} logoSlug={merchant.logoSlug} />
          </div>
        ))}
      </div>
      <br />
      <Button onClick={() => clearSelectedMerchants()}>Cancel selected</Button>
      <Button
        disabled={!(firstSelectedMerchant && secondSelectedMerchant)}
        type={"primary"}
        onClick={submitMerchants}
      >
        Submit
      </Button>
      <br />
      <h1>List of merchant pairs</h1>
      <div className={styles.merchantsList}>
        {merchantPairs.map((pair) => (
          <div
            className={`${styles.merchant}`}
            onClick={() => onSelectMerchant(merchant.merchant_id)}
          >
            <ComparisonCard
              merchantOne={pair?.merchant_one}
              merchantTwo={pair?.merchant_two}
              withShadow={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
