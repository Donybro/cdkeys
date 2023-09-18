import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useState } from "react";

export default function useGames() {
  const [key, setKey] = useState("games");
  const { isLoading, data, error } = useQuery("games", async () => {
    return await apiRequest.get("/games");
  });

  return {
    gamesListIsLoading: isLoading,
    gamesList: data?.data || [],
    gamesListError: error,
    setKey,
    key,
  };
}
