import { useMutation, useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";
import { useState } from "react";

export default function useMerchants() {
  const [keyForMerchant, updateMerchantsList] = useState("merchants");

  const { isLoading, data, error } = useQuery([keyForMerchant], async () => {
    return await apiRequest.get("/merchants");
  });

  const [keyForComparisons, updateComparisonsList] = useState("comparisons");

  const { data: merchantPairs } = useQuery([keyForComparisons], async () => {
    return await apiRequest.get("/comparisons");
  });

  function getExistPairSuggestionsForSelectedMerchant(selectedMerchantId) {
    let existSelectedMerchantPairIds = [];
    if (merchantPairs?.data) {
      const pairKeysArray = merchantPairs?.data.map((pair) => [
        pair.merchant_one.merchant_id,
        pair.merchant_two.merchant_id,
      ]);
      existSelectedMerchantPairIds = pairKeysArray
        .map((pair) => {
          if (pair.includes(selectedMerchantId)) {
            return pair.filter(
              (merchantId) => merchantId !== selectedMerchantId,
            )[0];
          }
        })
        .filter((item) => item);
    }
    return existSelectedMerchantPairIds;
  }

  const {
    mutate,
    isLoading: merchantsAreAdding,
    isSuccess: merchantAreAdded,
    isError: merchantAreNotAdded,
  } = useMutation({
    mutationFn: (data: any) => {
      return apiRequest.post("/comparisons", data);
    },
  });

  const {
    mutate: deletePairHandler,
    isLoading: pairIsDeleting,
    isSuccess: pairIsDeleted,
    isError: pairIsNotDeleted,
  } = useMutation({
    mutationFn: (comparisonId: any) => {
      return apiRequest.delete("/comparisons/" + comparisonId);
    },
  });

  return {
    merchantsAreLoading: isLoading,
    merchantsList: data?.data || [],
    merchantsListError: error,
    merchantPairs: merchantPairs?.data || [],
    getExistPairSuggestionsForSelectedMerchant,
    addMerchantPair: mutate,
    merchantsAreAdding,
    merchantAreAdded,
    merchantAreNotAdded,
    deletePairHandler,
    pairIsDeleting,
    pairIsDeleted,
    pairIsNotDeleted,
    updateMerchantsList,
    updateComparisonsList,
  };
}
