import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useState } from "react";

export default function useRegions() {
  const [key, setKey] = useState("regions");
  
  const [selectedRegion,setSelectedRegion] = useState<any>(null)
  
  const { isLoading, data, error } = useQuery(
    [key],
    async () => {
      return await apiRequest.get("/regions");
    },
    {
      keepPreviousData: true,
    },
  );

  return {
    regionsAreLoading: isLoading,
    regionsList: data?.data || [],
    regionsListError: error,
    setKey,
    key,
    selectedRegion,
    setSelectedRegion
  };
}
