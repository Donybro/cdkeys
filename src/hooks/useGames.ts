import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useState } from "react";

export default function useGames() {
  const [key, setKey] = useState("games");
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data, error } = useQuery([key, currentPage], async () => {
    return await apiRequest.get("/games", {
      params: {
        page: currentPage,
      },
    });
  });

  return {
    gamesListIsLoading: isLoading,
    gamesList: data?.data || [],
    gamesListError: error,
    setKey,
    key,
    totalGames: data?.data?.total,
    setCurrentPage,
    currentPage,
  };
}
