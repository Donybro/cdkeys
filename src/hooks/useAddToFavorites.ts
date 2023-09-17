import apiRequest from "../shared/utils/api/apiRequest";
import { message } from "antd";
import { useState } from "react";

export default function useAddToFavorites() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addToFavoritesHandler = async (game_id: any) => {
    try {
      setIsLoading(true);
      const { data } = await apiRequest.post("/favorites", {
        game_id,
      });
      if (data.success) {
        message.success("Added to favorites");
      }
    } catch (e) {
      setIsLoading(false);
      message.error("Something get wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const deleteFromFavorites = async (game_id: any) => {
    try {
      setIsLoading(true);
      const { data } = await apiRequest.delete("/favorites/" + game_id);
      if (data.success) {
        message.success("Deleted from favorites");
      }
    } catch (e) {
      setIsLoading(false);
      message.error("Something get wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addToFavoritesHandler,
    deleteFromFavorites,
    isLoading,
  };
}
