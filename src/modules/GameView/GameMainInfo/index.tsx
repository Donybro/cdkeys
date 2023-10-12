import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../../shared/utils/api/apiRequest";
import styles from "./style.module.scss";
import { Divider, Form, Select, Spin, Button, message } from "antd";
import OfferCard from "../../../components/Games/OfferCard";
import VariantCard from "../../../components/UI/VariantCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AddToFavorites from "../../../components/UI/AddToFavorites";
import useAddToFavorites from "../../../hooks/useAddToFavorites";
import GameMarginsTable from "../../../components/Tables/GameMarginsTable";
const Index: FC = () => {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [gameVariants, setGameVariants] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [variantIsDeleting, setVariantIsDeleting] = useState<boolean>(false);
  const [isComparingPrices, setIsComparingPrices] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [gameRegions, setGameRegions] = useState<any>([]);

  const getGameData = async () => {
    setIsLoading(true);
    const {
      data: { data },
    } = await apiRequest.get(`/games/${gameId}`);
    if (data) {
      setGameData(data);
      setGameRegions(
        Object.values(data.regions).map((el) => ({
          value: el.id,
          label: el.filterName,
        })),
      );
    }
    setIsLoading(false);
  };

  const getGameVariants = async () => {
    const {
      data: { data },
    } = await apiRequest.get(`/games/${gameId}/variants`);
    if (data) {
      setGameVariants(data);
    }
  };

  const onFinish = async (values: any) => {
    setIsSubmitting(true);
    const { data } = await apiRequest.post(`/games/${gameId}/variants`, {
      ...values,
    });
    if (data?.success) {
      await getGameVariants();
    }
    setIsSubmitting(false);
  };

  const compareGamePriceNow = async () => {
    setIsComparingPrices(true);
    const { data } = await apiRequest.post("/compare-now", {
      game_id: gameId,
    });
    if (data.success) {
      await getGameData();
      await getGameVariants();
    }
    setIsComparingPrices(false);
  };

  const syncGameNow = async () => {
    setIsSyncing(true);
    const { data } = await apiRequest.post("/update-now", {
      game_id: gameId,
    });
    if (data.success) {
      await getGameData();
      await getGameVariants();
    }
    setIsSyncing(false);
  };

  const deleteVariant = async (variantId) => {
    setVariantIsDeleting(true);
    try {
      const { data } = await apiRequest.delete(
        `/games/${gameId}/variants/${variantId}`,
      );
      if (data?.success) {
        message.success("Variant is deleted!");
        await getGameVariants();
      }
    } catch (e) {
      message.error("Something get wrong!");
    }
    setVariantIsDeleting(false);
  };

  useEffect(() => {
    if (gameId) {
      getGameData();
      getGameVariants();
    }
  }, [gameId]);

  const [form] = Form.useForm();

  const {
    addToFavoritesHandler,
    isLoading: addingToFavoritesIsLoading,
    deleteFromFavorites,
  } = useAddToFavorites();

  const onDeleteFromFavorites = async (game_id: any) => {
    await deleteFromFavorites(game_id);
  };

  return (
    <>
      {isLoading ? (
        <Spin spinning={isLoading} />
      ) : (
        <div>
          <div className={styles.header}>
            <div className={"flex items-center gap-6"}>
              <h1>{gameData?.name}</h1>
              {gameData?.is_favorite ? (
                <Button
                  disabled={!!addingToFavoritesIsLoading}
                  loading={!!addingToFavoritesIsLoading}
                  type={"primary"}
                  onClick={async () => {
                    await onDeleteFromFavorites(gameData.id);
                    await getGameData();
                  }}
                  icon={<FontAwesomeIcon icon={faTrash} />}
                >
                  Delete from favorites
                </Button>
              ) : (
                <AddToFavorites
                  isLoading={!!addingToFavoritesIsLoading}
                  onClick={async () => {
                    await addToFavoritesHandler(gameData.id);
                    await getGameData();
                  }}
                />
              )}
            </div>
            <div className={"flex items-center gap-6"}>
              <Button
                disabled={isComparingPrices}
                loading={isComparingPrices}
                type={"primary"}
                onClick={compareGamePriceNow}
              >
                Compare now
              </Button>
              <Button
                disabled={isSyncing}
                loading={isSyncing}
                type={"primary"}
                onClick={syncGameNow}
              >
                Sync now
              </Button>
            </div>
          </div>
          <img className={styles.image} src={gameData?.coverImageUrl} alt="" />
          <Divider />
          <h2 className={"my-2"}>Variants</h2>
          <div className={styles.variantWrapper}>
            {gameVariants?.map((variant) => (
              <VariantCard
                editionName={variant.edition.name}
                region={variant.region.name}
                deletable={true}
                isDeleting={variantIsDeleting}
                onDelete={() => deleteVariant(variant.id)}
              />
            ))}
          </div>
          <div className={"my-6"}>
            <h3 className={"my-2"}>Add Variant</h3>
            <Form layout={"inline"} form={form} onFinish={onFinish}>
              <Form.Item name={"edition_id"} rules={[{ required: true }]}>
                <Select
                  placeholder={"Select game edition"}
                  options={gameData?.editions.map((el) => ({
                    value: el.id,
                    label: el.name,
                  }))}
                />
              </Form.Item>
              <Form.Item name={"region_id"} rules={[{ required: true }]}>
                <Select
                  placeholder={"Select game region"}
                  options={gameRegions}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <h2 className={"my-6"}>Margins</h2>
          <GameMarginsTable data={gameData?.margins} pagination={false} />
          <h2 className={"my-6"}>Offers</h2>
          <div>
            {gameData?.last_update?.offers.map((offer: any, index: number) => {
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
                      gameData.last_update.merchants[offer.merchant]
                    }
                    regionInfo={gameData.last_update.regions[offer.region]}
                    editionInfo={gameData.last_update.editions[offer.edition]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
