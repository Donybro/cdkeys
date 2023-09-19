import React, { FC, useEffect, useState } from "react";
import useMerchants from "../../hooks/useMerchants";
import MerchantItem from "../../components/UI/MerchantItem";
import { Button, message, Space } from "antd";
import styles from "./style.module.scss";
import ComparisonCard from "../../components/UI/ComparisonCard";

const Index: FC = () => {
  const {
    getExistPairSuggestionsForSelectedMerchant,
    merchantsList,
    merchantPairs,
    addMerchantPair,
    merchantAreAdded,
    merchantAreNotAdded,
    merchantsAreAdding,
    deletePairHandler,
    pairIsDeleting,
    pairIsDeleted,
    pairIsNotDeleted,
    updateComparisonsList,
    updateMerchantsList,
  } = useMerchants();

  const [firstSelectedMerchant, setFirstSelectedMerchant] = useState<any>();
  const [secondSelectedMerchant, setSecondSelectedMerchant] = useState<any>();

  const [selectedPair, setSelectedPair] = useState<any>();

  const [existPairsForSelectedMerchant, setExistPairsForSelectedMerchant] =
    useState([]);

  useEffect(() => {
    if (merchantAreAdded) {
      clearSelectedMerchants();
      message.success("Merchant added!");
      updateLists();
    }
  }, [merchantAreAdded]);

  useEffect(() => {
    if (pairIsDeleted) {
      setSelectedPair("");
      updateLists();
      message.success("Pair deleted!");
    }
  }, [pairIsDeleted]);

  useEffect(() => {
    if (merchantAreNotAdded) {
      message.error("Something get wrong!");
    }
  }, [merchantAreNotAdded]);

  useEffect(() => {
    if (pairIsNotDeleted) {
      message.error("Something get wrong!");
    }
  }, [pairIsNotDeleted]);

  function updateLists() {
    updateComparisonsList((prevState) => prevState + "1");
    updateMerchantsList((prevState) => prevState + "1");
  }

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
    const payload = {
      merchant_one: firstSelectedMerchant,
      merchant_two: secondSelectedMerchant,
    };
    addMerchantPair(payload);
  };

  const deleteSelectedPair = () => {
    deletePairHandler(selectedPair);
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
      <Space size={10}>
        <Button onClick={() => clearSelectedMerchants()}>
          Cancel selected
        </Button>
        <Button
          disabled={
            !(firstSelectedMerchant && secondSelectedMerchant) ||
            merchantsAreAdding
          }
          loading={merchantsAreAdding}
          type={"primary"}
          onClick={submitMerchants}
        >
          Submit
        </Button>
      </Space>
      <br />
      <h1>List of merchant pairs</h1>
      <div className={styles.merchantsList}>
        {merchantPairs.map((pair) => (
          <div
            className={`${styles.merchant} ${
              selectedPair === pair.id ? styles.selected : null
            }`}
            onClick={() => setSelectedPair(pair.id)}
          >
            <ComparisonCard
              merchantOne={pair?.merchant_one}
              merchantTwo={pair?.merchant_two}
              withShadow={false}
            />
          </div>
        ))}
      </div>
      <br />
      <Button
        disabled={pairIsDeleting}
        loading={pairIsDeleting}
        type={"dashed"}
        onClick={deleteSelectedPair}
      >
        Delete selected pair
      </Button>
    </div>
  );
};

export default Index;
