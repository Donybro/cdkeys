import React, { FC, useState } from "react";
import styles from "../../pages/AllGamesPage/style.module.scss";
import { Button, message, Select, Spin, Table, Tag } from "antd";
import useGamesMargins from "../../hooks/useGamesMargins";
import useComparisonPairs from "../../hooks/useComparisonPairs";
import ComparisonCard from "../../components/UI/ComparisonCard";
import VariantCard from "../../components/UI/VariantCard";
import apiRequest from "../../shared/utils/api/apiRequest";
import moment from "moment";
import GameMarginsTable from "../../components/Tables/GameMarginsTable";
import useMerchants from "../../hooks/useMerchants.ts";
import MerchantItem from "../../components/UI/MerchantItem";

const Index: FC = () => {
  const {
    gamesList,
    gamesListIsLoading,
    setKey: setComparisonId,
    currentPage,
    setCurrentPage,
    total,
  } = useGamesMargins();
  

  const { data: comparisonList, getPairById } = useComparisonPairs();
  const { Option } = Select;

  const { merchantsList } = useMerchants();

  const [compareNowLoading, setCompareNowLoading] = useState<boolean>(false);

  const compareAllNow = async () => {
    try {
      setCompareNowLoading(true);
      const resp = await apiRequest.post("/compare-all");
    } catch (e) {
      message.error("Something get wrong");
    }
    setCompareNowLoading(false);
  };

  const handleChange = (value: any) => {
    setComparisonId(value);
  };
  
  const onMerchantSelect = (value: any) => {
    // setComparisonId(value);
  };
  const onPaginationChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.gamesPagesWrapper}>
      <div className={"flex items-center gap-20"}>
        <Select
          placeholder="Please select platforms pair"
          onChange={handleChange}
          optionLabelProp="label"
          popupClassName={styles.variantsPopupWrapper}
          popupMatchSelectWidth={false}
        >
          <Option
              value={null}
              label={'Select all'}
          >
            Select all
          </Option>
          {comparisonList.map((pair: any) => (
            <Option
              value={pair.id}
              label={
                <ComparisonCard
                  merchantOne={pair?.merchant_one}
                  merchantTwo={pair?.merchant_two}
                  withShadow={false}
                />
              }
            >
              {
                <ComparisonCard
                  merchantOne={pair.merchant_one}
                  merchantTwo={pair.merchant_two}
                  withShadow={false}
                />
              }
            </Option>
          ))}
        </Select>
        <Button
          onClick={compareAllNow}
          disabled={compareNowLoading}
          loading={compareNowLoading}
          type={"primary"}
        >
          Compare all now
        </Button>
        <Select
            placeholder="Select merchant to see price in table"
            onChange={onMerchantSelect}
            optionLabelProp="label"
            popupClassName={styles.variantsPopupWrapper}
            popupMatchSelectWidth={false}
        >
          {merchantsList.map((merchant: any) => (
              <Option
                  value={merchant.merchant_id}
                  label={
                    <MerchantItem name={merchant.name} logoSlug={merchant.logoSlug} />
                  }
              >
                {
                  <MerchantItem name={merchant.name} logoSlug={merchant.logoSlug} />
                }
              </Option>
          ))}
        </Select>
        
      </div>
      {gamesListIsLoading ? (
        <Spin />
      ) : (
        <GameMarginsTable
          data={gamesList.data}
          currentPage={currentPage}
          onPaginationChange={onPaginationChange}
          total={total}
        />
      )}
    </div>
  );
};

export default Index;
