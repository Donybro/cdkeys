import React, { FC } from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
interface VariantCardInterface {
  editionName: string;
  region: string;
}

const Index: FC<VariantCardInterface> = ({ editionName, region }) => {
  return (
    <div className={style.wrapper}>
      <span className={style.region}>
        <FontAwesomeIcon icon={faGlobe} />
        {region}
      </span>
      -<span className={style.editionName}>{editionName}</span>
    </div>
  );
};

export default Index;
