import React, {FC, useState} from "react";
import styles from "../../pages/AllGamesPage/style.module.scss";
import { Button, Spin, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import useAddToFavorites from "../../hooks/useAddToFavorites";
import useFavoriteGames from "../../hooks/useFavoriteGames";
import MeiliSearchBox from "../../components/UI/MeiliSearchBox";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../shared/utils/api/apiRequest.ts";
import moment from "moment";
import VariantCard from "../../components/UI/VariantCard";

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

  const navigate = useNavigate();

  const [isComparingPrices, setIsComparingPrices] = useState<any>({});
  const [isSyncing, setIsSyncing] = useState<any>({});

  const compareGamePriceNow = async (gameId:any) => {
    setIsComparingPrices({
      ...isComparingPrices,
      [gameId]:true
    });
    const { data } = await apiRequest.post("/compare-now", {
      game_id: gameId,
    });
    if (data.success) {
      setKey(key + "1");
    }
    setIsComparingPrices(
        {...isComparingPrices,[gameId]:false}
    );
  };

  const syncGameNow = async (gameId:any) => {
    setIsSyncing({
      ...isSyncing,
      [gameId]:true
    });
    const { data } = await apiRequest.post("/update-now", {
      game_id: gameId,
    });
    if (data.success) {
      setKey(key + "1");
    }
    setIsSyncing({...isSyncing,[gameId]:false});
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
      key: "last_update",
      title: "Last update",
      width: "100px",
      render: (record: any) => {
        return (
          <div>
            {moment(record.last_update.updated_at).format('DD.MM.YYYY hh:mm')}
          </div>
        );
      },
    },
    {
      title: "Compare now",
      render: (record: any) => {
        return (
            <Button
                disabled={isComparingPrices && isComparingPrices[record.game_id]}
                loading={isComparingPrices && isComparingPrices[record.game_id]}
                type={"primary"}
                onClick={() => compareGamePriceNow(record.game_id)}
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
                disabled={isSyncing && isSyncing[record.game_id]}
                loading={isSyncing && isSyncing[record.game_id]}
                type={"primary"}
                onClick={() => syncGameNow(record.game_id)}
            >
              Sync now
            </Button>
        );
      },
      width: "150px",
    },
    {
      key: "action",
      title: "Action",
      render: (val: any, record: any) => (
        <div className={"flex items-center gap-20"}>
          <Button
            disabled={addingToFavoritesIsLoading === record.game_id}
            loading={addingToFavoritesIsLoading === record.game_id}
            type={"primary"}
            onClick={() => onDeleteFromFavorites(record.game_id)}
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
  
  
  const expandedRowRender :any = (record:any)=>{
    return <div>
      <h2>Variants</h2>
      <div className={'flex gap-10'}>{
        record.variants.map((variant:any)=><VariantCard
            editionName={variant.edition.name}
            region={variant.region.name}
            deletable={false}
        />)
      }</div>
    </div>
  }

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
            expandable={{ expandedRowRender}}
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
