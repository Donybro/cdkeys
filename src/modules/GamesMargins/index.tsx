import React, { FC } from "react";
import styles from "../../pages/AllGamesPage/style.module.scss";
import { Select, Spin, Table } from "antd";
import useGamesMargins from "../../hooks/useGamesMargins";
import useComparisonPairs from "../../hooks/useComparisonPairs";
import ComparisonCard from "../../components/UI/ComparisonCard";

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

  const handleChange = (value: any) => {
    setComparisonId(value);
  };
  const onPaginationChange = (page: any) => {
    setCurrentPage(page);
  };

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
      title: "Margin",
      render: (record: any) => {
        return <div>{record.percent}%</div>;
      },
      width: "100px",
    },
  ];

  return (
    <div className={styles.gamesPagesWrapper}>
      <div>
        <Select
          placeholder="Please select platforms pair"
          onChange={handleChange}
          optionLabelProp="label"
        >
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
      </div>
      {gamesListIsLoading ? (
        <Spin />
      ) : (
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={gamesList.data}
          pagination={{
            pageSize: 100,
            defaultPageSize: 100,
            current: currentPage,
            onChange: onPaginationChange,
            total: total,
          }}
          scroll={{ y: 900 }}
        />
      )}
    </div>
  );
};

export default Index;
