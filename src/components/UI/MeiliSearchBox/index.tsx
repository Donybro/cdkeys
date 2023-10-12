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

import { faXmark } from "@fortawesome/free-solid-svg-icons";

const searchClient = instantMeiliSearch(
  "http://165.232.104.38:70/",
  "cdKeyStopPWdS",
  {
    primaryKey: "id",
  },
);
interface MailiSearchBoxProps {
  filters?: string;
}

const Index: FC<MailiSearchBoxProps> = ({ filters = "" }) => {
  const navigate = useNavigate();

  const Hit = ({ hit }) => {
    const onClickHit = () => {
      navigate(`/games/${hit.id}`);
    };
    const { addToFavoritesHandler, deleteFromFavorites } = useAddToFavorites();

    const [loadingHit, setLoadingHit] = useState({});

    const instantSearchObject = useInstantSearch();

    const deleteFromFavoritesHandler = async (e, hitId) => {
      setLoadingHit({ ...loadingHit, [hitId]: true });
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      await deleteFromFavorites(hitId);
      await searchClient.clearCache();
      setTimeout(async () => {
        await instantSearchObject.refresh();
        setLoadingHit({ ...loadingHit, [hitId]: false });
      }, 500);
    };

    const addToFavorites = async (e, hitId) => {
      setLoadingHit({ ...loadingHit, [hitId]: true });
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      await addToFavoritesHandler(hitId);
      await searchClient.clearCache();
      setTimeout(async () => {
        await instantSearchObject.refresh();
        setLoadingHit({ ...loadingHit, [hitId]: false });
      }, 500);
    };

    return (
      <div onClick={onClickHit} className={"result-hit-wrapper"}>
        <Highlight attribute="name" hit={hit} />
        {hit.is_favorite ? (
          <Button
            loading={loadingHit[hit.id]}
            type={"primary"}
            className={"delete-btn"}
            onClick={async (e) => {
              await deleteFromFavoritesHandler(e, hit.id);
            }}
            icon={<FontAwesomeIcon icon={faTrash} />}
          />
        ) : (
          <AddToFavorites
            isLoading={loadingHit[hit.id]}
            onClick={async (e) => {
              await addToFavorites(e, hit.id);
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
        <Configure analytics={false} filters={filters} hitsPerPage={40} />
        <SearchBox
          resetIconComponent={() => <FontAwesomeIcon icon={faXmark} />}
          queryHook={queryHook}
          placeholder={"Search games here"}
        />
        {showHits && <Hits hitComponent={Hit} />}
      </InstantSearch>
    </div>
  );
};

export default React.memo(Index);
