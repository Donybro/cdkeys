import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useState } from "react";

export default function useEditions() {
  const [key, setKey] = useState("editions");
  const [selectedEdition,setSelectedEdition] = useState<any>(null)
  const { isLoading, data, error } = useQuery(
    [key],
    async () => {
      return await apiRequest.get("/editions");
    },
    {
      keepPreviousData: true,
    },
  );

  return {
    editionsAreLoading: isLoading,
    editionsList: data?.data || [],
    editionsListError: error,
    setKey,
    key,
    selectedEdition,
    setSelectedEdition
  };
}
