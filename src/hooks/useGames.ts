import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";

export default function useGames() {
  const { isLoading, data, error } = useQuery("games", async () => {
    return await apiRequest.get("/games");
  });

  return {
    gamesListIsLoading: isLoading,
    gamesList: data?.data || [],
    gamesListError: error,
  };
}
