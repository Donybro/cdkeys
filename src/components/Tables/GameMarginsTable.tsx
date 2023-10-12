import React, { FC } from "react";
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
      key: "pair",
      title: "Platforms pair",
      width: "300px",
      render: (record: any) => {
        const merchants = getPairById(record.comparison_id);
        return (
          <ComparisonCard
            merchantOne={merchants?.merchant_one}
            merchantTwo={merchants?.merchant_two}
            id={merchants?.id}
          />
        );
      },
    },
    {
      key: "variant",
      title: "Variant",
      width: "300px",
      render: (record: any) => {
        return (
          <VariantCard
            editionName={record?.variant.edition.name}
            region={record?.variant.region.filterName}
          />
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
            <Tag>{moment(record?.updated_at).format("DD.MM.YYYY hh:mm")}</Tag>
          </div>
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
