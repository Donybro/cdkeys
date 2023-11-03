import { FC } from "react";
import { Table, Tag } from "antd";
import ComparisonCard from "../UI/ComparisonCard";
import VariantCard from "../UI/VariantCard";
import moment from "moment/moment";
import useComparisonPairs from "../../hooks/useComparisonPairs";

interface GameMarginsTableProps {
  data: any[];
  currentPage?: number;
  onPaginationChange?: any;
  total?: number;
  pagination?: boolean;
}

const GameMarginsTable: FC<GameMarginsTableProps> = ({
  data,
  currentPage,
  onPaginationChange,
  total,
  pagination = true,
}) => {
  const { getPairById } = useComparisonPairs();
  
  const getLivePrice =(merchantId:any,regionId:any,editionId:any,offers:any)=>{
    const result = offers.find((offer:any)=> offer.edition == editionId && offer.region == regionId && offer.merchant == merchantId )
    console.log(result,'result')
    return result?.price?.eur?.priceWithoutCoupon || '-'
  }

  const columns: any = [
    {
      key: "name",
      title: "Name",
      width: "300px",
      render: (record: any) => {
        return (
          <div>
            <h3>{record.game.name}</h3>
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
    },{
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
        return <div>{getLivePrice(record.comparison.merchantOne.id,record.variant.region_id,record.variant.edition_id,record.lastUpdate.offers)}</div>
      },
      width: "100px",
    },
    {
      title: 'Live price #2',
      render:(record:any)=>{
        return <div>{getLivePrice(record.comparison.merchantTwo.id,record.variant.region_id,record.variant.edition_id,record.lastUpdate.offers)}</div>
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
  ];
  return (
    <Table
      rowKey={(record) => record.id}
      columns={columns}
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
