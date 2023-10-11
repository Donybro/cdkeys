import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useState } from "react";

export default function useFavoriteGames() {
  const [key, setKey] = useState("favorite-games");
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data, error } = useQuery(
    [key, currentPage],
    async () => {
      return await apiRequest.get("/favorites", {
        params: {
          page: currentPage,
        },
      });
    },
    {
      keepPreviousData: true,
    },
  );

  return {
    gamesListIsLoading: isLoading,
    gamesList: data?.data || [],
    gamesListError: error,
    setKey,
    key,
    total: data?.data?.total,
    setCurrentPage,
    currentPage,
  };
}
