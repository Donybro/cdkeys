import apiRequest from "../shared/utils/api/apiRequest";
import { message } from "antd";
import { useState } from "react";

export default function useAddToFavorites() {
  const [isLoading, setIsLoading] = useState<string>("");
  const addToFavoritesHandler = async (game_id: any) => {
    try {
      setIsLoading(game_id);
      const { data } = await apiRequest.post("/favorites", {
        game_id,
      });
      if (data.success) {
        message.success("Added to favorites");
      }
    } catch (e) {
      setIsLoading("");
      message.error("Something get wrong!");
    } finally {
      setIsLoading("");
    }
  };
  const deleteFromFavorites = async (game_id: any) => {
    try {
      setIsLoading(game_id);
      const { data } = await apiRequest.post("/favorites/remove", {
        game_id,
      });
      if (data.success) {
        message.success("Deleted from favorites");
      }
    } catch (e) {
      setIsLoading("");
      message.error("Something get wrong!");
    } finally {
      setIsLoading("");
    }
  };

  return {
    addToFavoritesHandler,
    deleteFromFavorites,
    isLoading,
  };
}
