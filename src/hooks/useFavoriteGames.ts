import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useState } from "react";

export default function useFavoriteGames() {
  const [key, setKey] = useState("favorite-games");

  const { isLoading, data, error } = useQuery(key, async () => {
    return await apiRequest.get("/favorites");
  });

  return {
    gamesListIsLoading: isLoading,
    gamesList: data?.data || [],
    gamesListError: error,
    setKey,
    key,
  };
}
