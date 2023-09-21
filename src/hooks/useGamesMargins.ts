import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useState } from "react";

export default function useGamesMargins() {
  const [key, setKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data, error } = useQuery(
    ["game-margins", key, [currentPage]],
    async () => {
      return await apiRequest.get("/margins", {
        params: {
          comparison_id: key,
          page: currentPage,
        },
      });
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
