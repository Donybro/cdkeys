import React, { FC } from "react";
import { Layout } from "antd";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const { Header } = Layout;

const searchClient = instantMeiliSearch(
  "http://165.232.104.38:70/",
  "cdKeyStopPWdS",
);

const Hit = ({ hit }) => <Highlight attribute="name" hit={hit} />;
const Index: FC = () => {
  return (
    <Header style={{ padding: 0, background: "#fff" }}>
      <InstantSearch indexName="" searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </Header>
  );
};

export default Index;
