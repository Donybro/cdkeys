import React, { FC } from "react";
import styles from "../../pages/AllGamesPage/style.module.scss";
import { Button, Spin, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import useAddToFavorites from "../../hooks/useAddToFavorites";
import useFavoriteGames from "../../hooks/useFavoriteGames";
import MeiliSearchBox from "../../components/UI/MeiliSearchBox";

const Index: FC = () => {
  const {
    gamesList,
    gamesListIsLoading,
    setKey,
    key,
    total,
    currentPage,
    setCurrentPage,
  } = useFavoriteGames();
  const { deleteFromFavorites, isLoading: addingToFavoritesIsLoading } =
    useAddToFavorites();

  const onDeleteFromFavorites = async (game_id: any) => {
    await deleteFromFavorites(game_id);
    setKey(key + "1");
  };

  const columns: any = [
    {
      key: "name",
      title: "Name",
      width: "300px",
      render: (record: any) => {
        return (
          <div>
            <h3>{record?.name}</h3>
          </div>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (val: any, record: any) => (
        <div className={"flex items-center gap-20"}>
          <Button
            disabled={addingToFavoritesIsLoading === record.id}
            loading={addingToFavoritesIsLoading === record.id}
            type={"primary"}
            onClick={() => onDeleteFromFavorites(record.id)}
            icon={<FontAwesomeIcon icon={faTrash} />}
          >
            Delete from favorites
          </Button>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/games/${record.id}`)}
          >
            <FontAwesomeIcon icon={faEye} />
          </div>
        </div>
      ),
      width: "100px",
    },
  ];

  const onPaginationChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.gamesPagesWrapper}>
      {gamesListIsLoading ? (
        <Spin />
      ) : (
        <div>
          <MeiliSearchBox filters={"is_favorite = 'true'"} />
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
        </div>
      )}
    </div>
  );
};

export default Index;
