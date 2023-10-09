import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import {
  SearchBox,
  InstantSearch,
  Hits,
  Highlight,
  useInstantSearch,
  Configure,
} from "react-instantsearch";
import "./style.scss";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import AddToFavorites from "../AddToFavorites";
import useAddToFavorites from "../../../hooks/useAddToFavorites";
import { createInsightsMiddleware } from "instantsearch.js/es/middlewares";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import addToFavorites from "../AddToFavorites";

const searchClient = instantMeiliSearch(
  "http://165.232.104.38:70/",
  "cdKeyStopPWdS",
  {
    primaryKey: "id",
  },
);

interface MailiSearchBoxProps {}

const Index: FC<MailiSearchBoxProps> = () => {
  const navigate = useNavigate();

  const Hit = ({ hit }) => {
    const onClickHit = () => {
      navigate(`games/${hit.id}`);
    };
    const { addToFavoritesHandler, deleteFromFavorites } = useAddToFavorites();

    const [loadingHit, setLoadingHit] = useState({});

    const instantSearchObject = useInstantSearch();

    return (
      <div onClick={onClickHit} className={"result-hit-wrapper"}>
        <Highlight attribute="name" hit={hit} />
        {hit.is_favorite ? (
          <Button
            loading={loadingHit[hit.id]}
            type={"primary"}
            onClick={async (e) => {
              setLoadingHit({ ...loadingHit, [hit.id]: true });
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              await deleteFromFavorites(hit.id);
              await searchClient.clearCache();
              setTimeout(async () => {
                await instantSearchObject.refresh();
                setLoadingHit({ ...loadingHit, [hit.id]: false });
              }, 500);
            }}
            icon={<FontAwesomeIcon icon={faTrash} />}
          />
        ) : (
          <AddToFavorites
            isLoading={loadingHit[hit.id]}
            onClick={async (e) => {
              setLoadingHit({ ...loadingHit, [hit.id]: true });
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              await addToFavoritesHandler(hit.id);
              await searchClient.clearCache();
              setTimeout(async () => {
                await instantSearchObject.refresh();
                setLoadingHit({ ...loadingHit, [hit.id]: false });
              }, 500);
            }}
          />
        )}
      </div>
    );
  };

  const [showHits, setShowHits] = useState(false);

  const queryHook = (query, search) => {
    search(query);
    if (query) {
      setShowHits(true);
    } else setShowHits(false);
  };

  return (
    <div className={"meilisearch-box-ui"}>
      <InstantSearch indexName="games" searchClient={searchClient}>
        <Configure analytics={false} filters="" hitsPerPage={40} />
        <SearchBox queryHook={queryHook} placeholder={"Search games here"} />
        {showHits && <Hits hitComponent={Hit} />}
      </InstantSearch>
    </div>
  );
};

export default React.memo(Index);
