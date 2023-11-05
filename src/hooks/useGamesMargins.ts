import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useState } from "react";

export default function useGamesMargins() {
  const [key, setKey] = useState("");
  const [update, setUpdate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data, error } = useQuery(
    ["game-margins", [key,update], [currentPage]],
    async () => {
      return await apiRequest.get("/margins", {
        params: {
          comparison_id: key || null,
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
    setUpdate,
    currentPage,
    update,
  };
}
