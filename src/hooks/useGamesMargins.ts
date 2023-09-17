import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useEffect, useState } from "react";

export default function useGamesMargins() {
  const [key, setKey] = useState("");

  const { isLoading, data, error } = useQuery(
    ["game-margins", key],
    async () => {
      return await apiRequest.get("/margins", {
        params: {
          comparison_id: key,
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
  };
}
