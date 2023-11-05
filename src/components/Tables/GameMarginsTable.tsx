import React, {FC, useEffect, useState} from "react";
import {Button, Table, Tag} from "antd";
import moment from "moment/moment";
import useComparisonPairs from "../../hooks/useComparisonPairs";
import apiRequest from "../../shared/utils/api/apiRequest.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

interface GameMarginsTableProps {
  data: any[];
  selectedMerchants?: any[];
  currentPage?: number;
  onPaginationChange?: any;
  total?: number;
  pagination?: boolean;
  onCompareNow?: any;
  onSyncNow?: any;
  compareNowIsLoading?: any;
  syncNowIsLoading?: any;
}

const GameMarginsTable: FC<GameMarginsTableProps> = ({
  data,
  currentPage,
  onPaginationChange,
  total,
  pagination = true,
                                                       selectedMerchants,
    onCompareNow,
    onSyncNow,
    compareNowIsLoading,
    syncNowIsLoading
}) => {
  const { getPairById } = useComparisonPairs();
  
  const getLivePrice =(merchantId:any,regionId:any,editionId:any,offers:any)=>{
    const result = offers.find((offer:any)=> offer.edition == editionId && offer.region == regionId && offer.merchant == merchantId )
    return result?.price?.eur?.priceWithoutCoupon
  }
  
  const columns = [
    {
      key: "name",
      title: "Name",
      width: "300px",
      render: (record: any) => {
        return (
            <div>
              <h3>{record.name}</h3>
            </div>
        );
      },
    },
    {
      key: "buy",
      title: "Buy",
      width: "100px",
      render: (record: any) => {
        const merchants = getPairById(record.comparison_id);
        return (
            <div>{merchants?.merchant_one?.name}- {record.price_one} EUR</div>
        );
      },
    },
    {
      key: "sell",
      title: "Sell",
      width: "100px",
      render: (record: any) => {
        const merchants = getPairById(record.comparison_id);
        return (
            <div>{merchants?.merchant_two?.name} - {record.price_two} EUR</div>
        );
      },
    },
    {
      key: "edition",
      title: "Edition",
      width: "100px",
      render: (record: any) => {
        return (
            <div>{record?.variant.edition.name}</div>
        );
      },
    },
    {
      key: "region",
      title: "Region",
      width: "100px",
      render: (record: any) => {
        return (
            <div>{record?.variant.region.filterName}</div>
        );
      },
    },
    {
      title: "Margin",
      render: (record: any) => {
        return (
            <div className={"flex items-center gap-8"}>
              <Tag color={record.percent > 0 ? "cyan" : "magenta"}>
                {record.percent}%
              </Tag>
            </div>
        );
      },
      width: "100px",
    },
    {
      title: 'Live price #1',
      render:(record:any)=>{
        return <div>{ getLivePrice(record.comparison.merchantOne.merchant_id,record.variant.region_id,record.variant.edition_id,record.lastUpdate.offers) ? `${getLivePrice(record.comparison.merchantOne.merchant_id,record.variant.region_id,record.variant.edition_id,record.lastUpdate.offers)} EUR`:'-' }</div>
      },
      width: "100px",
    },
    {
      title: 'Live price #2',
      render:(record:any)=>{
        return <div>{getLivePrice(record.comparison.merchantTwo.merchant_id,record.variant.region_id,record.variant.edition_id,record.lastUpdate.offers) ? `${getLivePrice(record.comparison.merchantTwo.merchant_id,record.variant.region_id,record.variant.edition_id,record.lastUpdate.offers)} EUR`:'-'}</div>
      },
      width: "100px",
    },
    {
      title: "Last updated",
      render: (record: any) => {
        return (
            <div>{moment(record.lastUpdate.updated_at).format('DD.MM.YYYY hh:mm')}</div>
        );
      },
      width: "100px",
    },
    {
      title: "Calculated date",
      render: (record: any) => {
        return (
            <div>{moment(record.updated_at).format('DD.MM.YYYY hh:mm')}</div>
        );
      },
      width: "100px",
    },
    {
      title: "Compare now",
      render: (record: any) => {
        return (
            <Button
                disabled={compareNowIsLoading && compareNowIsLoading[record.game.id]}
                loading={compareNowIsLoading && compareNowIsLoading[record.game.id]}
                type={"primary"}
                onClick={() => onCompareNow(record.game.id)}
            >
              Compare now
            </Button>
        );
      },
      width: "150px",
    },
    {
      title: "Sync now",
      render: (record: any) => {
        return (
            <Button
                disabled={syncNowIsLoading && syncNowIsLoading[record.game.id]}
                loading={syncNowIsLoading && syncNowIsLoading[record.game.id]}
                type={"primary"}
                onClick={() => onSyncNow(record.game.id)}
            >
              Sync now
            </Button>
        );
      },
      width: "150px",
    },
  ]
  const [filteredColumns,setFilteredColumns] = useState(columns)

  console.log(compareNowIsLoading,'compareNowIsLoading')
  console.log(syncNowIsLoading,'syncNowIsLoading')
  
  useEffect(()=>{
    if(selectedMerchants){
      const merchantPriceColumns = selectedMerchants.map((merchant:any)=>({
        title: `Merchant price - (${merchant.name})`,
        render:(record:any)=>{
          return <div>{getLivePrice(merchant.merchant_id,record.variant.region_id,record.variant.edition_id,record.lastUpdate.offers) ? `${getLivePrice(merchant.merchant_id,record.variant.region_id,record.variant.edition_id,record.lastUpdate.offers)} EUR` : '-'}</div>
        },
        width: "100px",
      }))
      const index = 8;
      const newColumns = [...columns.slice(0, index), ...merchantPriceColumns, ...columns.slice(index)]
      
      setFilteredColumns(newColumns)
    }
    
  },[selectedMerchants])
  
  return (
    <Table
      rowKey={(record) => record.id}
      columns={filteredColumns}
      dataSource={data}
      pagination={
        pagination && {
          pageSize: 100,
          defaultPageSize: 100,
          current: currentPage,
          onChange: onPaginationChange,
          total: total,
        }
      }
      scroll={{ y: 900 }}
    />
  );
};

export default GameMarginsTable;
