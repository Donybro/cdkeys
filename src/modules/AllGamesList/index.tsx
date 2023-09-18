import React, { FC, useEffect, useState } from "react";
import useGames from "../../hooks/useGames";
import styles from "../../pages/AllGamesPage/style.module.scss";
import { Spin, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import OfferCard from "../../components/Games/OfferCard";
import AddToFavorites from "../../components/UI/AddToFavorites";
import useAddToFavorites from "../../hooks/useAddToFavorites";
import MeiliSearchBox from "../../components/UI/MeiliSearchBox";
const Index: FC = () => {
  const { gamesList, gamesListIsLoading } = useGames();

  const { addToFavoritesHandler, isLoading: addingToFavoritesIsLoading } =
    useAddToFavorites();

  const columns: any = [
    {
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
      render: (val: any, record: any) => (
        <AddToFavorites
          isLoading={addingToFavoritesIsLoading === record.game_id}
          onClick={async () => {
            await addToFavoritesHandler(record.game_id);
            // setKey(key + 1);
          }}
        />
      ),
      width: "100px",
    },
  ];

  return (
    <div className={styles.gamesPagesWrapper}>
      {gamesListIsLoading ? (
        <Spin />
      ) : (
        <div>
          <MeiliSearchBox />
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={gamesList.data}
            pagination={{ pageSize: 100, defaultPageSize: 100 }}
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
                          editionInfo={
                            record.lastUpdate.editions[offer.edition]
                          }
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
          />
        </div>
      )}
    </div>
  );
};

export default Index;
