import { useQuery } from "react-query";
import apiRequest from "../shared/utils/api/apiRequest";

export default function useMerchants() {
  const { isLoading, data, error } = useQuery("merchants", async () => {
    return await apiRequest.get("/merchants");
  });

  const { data: merchantPairs } = useQuery("comparisons", async () => {
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

  return {
    merchantsAreLoading: isLoading,
    merchantsList: data?.data || [],
    merchantsListError: error,
    merchantPairs: merchantPairs?.data || [],
    getExistPairSuggestionsForSelectedMerchant,
  };
}
