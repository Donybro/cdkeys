import React, { FC } from "react";
import useGames from "../../hooks/useGames";
import styles from "../../pages/AllGamesPage/style.module.scss";
import { Spin, Table, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faTrash } from "@fortawesome/free-solid-svg-icons";
import OfferCard from "../../components/Games/OfferCard";
import AddToFavorites from "../../components/UI/AddToFavorites";
import useAddToFavorites from "../../hooks/useAddToFavorites";
import MeiliSearchBox from "../../components/UI/MeiliSearchBox";

const Index: FC = () => {
  const {
    gamesList,
    gamesListIsLoading,
    setKey,
    key,
    setCurrentPage,
    currentPage,
    totalGames,
  } = useGames();

  const {
    addToFavoritesHandler,
    isLoading: addingToFavoritesIsLoading,
    deleteFromFavorites,
  } = useAddToFavorites();

  const onDeleteFromFavorites = async (game_id: any) => {
    await deleteFromFavorites(game_id);
    setKey(key + "1");
  };

  const columns: any = [
    {
      title: "Name",
      width: "300px",
      fixed: "left",
      render: (record: any) => {
        return (
          <div>
            <h3>{record.name}</h3>
          </div>
        );
      },
    },
    {
      title: "Best offer",
      render: (record: any) => {
        const bestOffer = record?.lastUpdate?.offers[0];
        if (!bestOffer) {
          return <FontAwesomeIcon icon={faBan} />;
        }
        return (
          <OfferCard
            offerInfo={bestOffer}
            merchantInfo={record.lastUpdate.merchants[bestOffer.merchant]}
            regionInfo={record.lastUpdate.regions[bestOffer.region]}
            editionInfo={record.lastUpdate.editions[bestOffer.edition]}
          />
        );
      },
    },
    {
      title: "Add to favorites",
      render: (val: any, record: any) => {
        return (
          <div>
            {record.is_favorite ? (
              <Button
                disabled={addingToFavoritesIsLoading === record.id}
                loading={addingToFavoritesIsLoading === record.id}
                type={"primary"}
                onClick={() => onDeleteFromFavorites(record.id)}
                icon={<FontAwesomeIcon icon={faTrash} />}
              >
                Delete from favorites
              </Button>
            ) : (
              <AddToFavorites
                isLoading={addingToFavoritesIsLoading === record.id}
                onClick={async () => {
                  await addToFavoritesHandler(record.id);
                  setKey(key + "1");
                }}
              />
            )}
          </div>
        );
      },
      width: "220px",
    },
  ];

  const onPaginationChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.gamesPagesWrapper}>
      <div>
        <MeiliSearchBox />
        <Table
          loading={gamesListIsLoading}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={gamesList}
          pagination={{
            pageSize: 100,
            defaultPageSize: 100,
            current: currentPage,
            onChange: onPaginationChange,
            total: totalGames,
          }}
          expandable={{
            expandedRowRender: (record) => {
              return record.lastUpdate?.offers.map(
                (offer: any, index: number) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {index + 1}
                      <OfferCard
                        offerInfo={offer}
                        merchantInfo={
                          record.lastUpdate.merchants[offer.merchant]
                        }
                        regionInfo={record.lastUpdate.regions[offer.region]}
                        editionInfo={record.lastUpdate.editions[offer.edition]}
                      />
                    </div>
                  );
                },
              );
            },
            rowExpandable: (record: any) =>
              record.lastUpdate?.offers?.length > 1,
          }}
          scroll={{ y: 900 }}
          showTotal={true}
        />
      </div>
    </div>
  );
};

export default Index;
