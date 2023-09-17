import React, { FC } from "react";
import styles from "../../pages/AllGamesPage/style.module.scss";
import { Button, Spin, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useAddToFavorites from "../../hooks/useAddToFavorites";
import useFavoriteGames from "../../hooks/useFavoriteGames";

const Index: FC = () => {
  const { gamesList, gamesListIsLoading, setKey, key } = useFavoriteGames();
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
            <h3>{record.game.name}</h3>
          </div>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (val: any, record: any) => (
        <Button
          disabled={addingToFavoritesIsLoading === record.game_id}
          loading={addingToFavoritesIsLoading === record.game_id}
          type={"primary"}
          onClick={() => onDeleteFromFavorites(record.game_id)}
          icon={<FontAwesomeIcon icon={faTrash} />}
        >
          Delete from favorites
        </Button>
      ),
      width: "100px",
    },
  ];

  return (
    <div className={styles.gamesPagesWrapper}>
      {gamesListIsLoading ? (
        <Spin />
      ) : (
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={gamesList.data}
          pagination={{ pageSize: 100, defaultPageSize: 100 }}
          scroll={{ y: 900 }}
        />
      )}
    </div>
  );
};

export default Index;
