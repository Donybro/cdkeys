import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";

export default function useComparisonPairs() {
  const { isLoading, data, error } = useQuery("comparison-pairs", async () => {
    return await apiRequest.get("/comparisons");
  });

  const getPairById = (comparisonId: any) => {
    if (data?.data) {
      return data?.data?.filter((val) => val.id === comparisonId)[0];
    }
    return {};
  };

  return {
    isLoading,
    data: data?.data || [],
    error,
    getPairById,
  };
}
