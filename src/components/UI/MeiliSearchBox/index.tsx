import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import {
  SearchBox,
  InstantSearch,
  Hits,
  Highlight,
  useInstantSearch,
} from "react-instantsearch";
import "./style.scss";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import AddToFavorites from "../AddToFavorites";
import useAddToFavorites from "../../../hooks/useAddToFavorites";
import { createInsightsMiddleware } from "instantsearch.js/es/middlewares";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const searchClient = instantMeiliSearch(
  "http://165.232.104.38:70/",
  "cdKeyStopPWdS",
);

interface MailiSearchBoxProps {}

function InsightsMiddleware() {
  const { addMiddlewares } = useInstantSearch();
  const { addToFavoritesHandler, deleteFromFavorites } = useAddToFavorites();
  useLayoutEffect(() => {
    const middleware = createInsightsMiddleware({
      onEvent: (event) => {
        const { payload, eventType } = event;

        // Send the event to a third-party tracker
        if (
          eventType === "click" &&
          payload.eventName.type === "add-to-favorites"
        ) {
          addToFavoritesHandler(payload.eventName.game_id);
        } else if (
          eventType === "click" &&
          payload.eventName.type === "delete-from-favorites"
        ) {
          deleteFromFavorites(payload.eventName.game_id);
        }
      },
    });

    return addMiddlewares(middleware);
  }, [addMiddlewares]);

  return null;
}

const Index: FC<MailiSearchBoxProps> = () => {
  const Hit = ({ hit, sendEvent }) => {
    return (
      <div className={"result-hit-wrapper"}>
        <Highlight attribute="name" hit={hit} />
        {hit.is_favorite ? (
          <Button
            type={"primary"}
            onClick={() =>
              sendEvent("click", hit, {
                type: "delete-from-favorites",
                game_id: hit.id,
              })
            }
            icon={<FontAwesomeIcon icon={faTrash} />}
          />
        ) : (
          <AddToFavorites
            onClick={() =>
              sendEvent("click", hit, {
                type: "add-to-favorites",
                game_id: hit.id,
              })
            }
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
        <SearchBox queryHook={queryHook} placeholder={"Search games here"} />
        {showHits && <Hits hitComponent={Hit} />}
        <InsightsMiddleware />
      </InstantSearch>
    </div>
  );
};

export default React.memo(Index);
