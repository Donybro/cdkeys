import React, { FC } from "react";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
interface VariantCardInterface {
  editionName: string;
  region: string;
  deletable?: boolean;
  onDelete?: any;
  isDeleting?: boolean;
}

const Index: FC<VariantCardInterface> = ({
  editionName,
  region,
  deletable = false,
  onDelete,
  isDeleting,
}) => {
  return (
    <div className={style.wrapper}>
      <span className={style.region}>
        <FontAwesomeIcon icon={faGlobe} />
        {region}
      </span>
      -<span className={style.editionName}>{editionName}</span>
      {deletable && (
        <Button
          disabled={isDeleting}
          loading={isDeleting}
          onClick={onDelete}
          icon={<FontAwesomeIcon icon={faXmark} />}
        />
      )}
    </div>
  );
};

export default Index;
