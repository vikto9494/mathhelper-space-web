import React from "react";
import translate from "../../../../translations/translate";
// icons
import Icon from "@mdi/react";
import {mdiAccessPointCheck, mdiDeveloperBoard, mdiGamepad, mdiNintendoGameBoy, mdiTeach} from "@mdi/js";
import { mdiTimer } from "@mdi/js";
import { mdiRobot } from "@mdi/js";

import "./main-cooperation-options.scss";

import bigSvgImg from "../../../../assets/main-cooperation-options/hands.svg";

interface TextWithSvgBlock {
  svgUrl: string;
  captionTextId: string;
  backgroundColor: string;
  fontColor: string;
}

const MainCooperationOptions: React.FC = () => {
  // translation vars
  const translationPrefix: string = "mainCooperationOptions";
  const titleId: string = translationPrefix + ".title";
  const mainTextId: string = translationPrefix + ".mainText";

  const textWithSvgBlock: TextWithSvgBlock[] = [
    {
      svgUrl: mdiGamepad,
      captionTextId: translationPrefix + ".carouselCaption1",
      backgroundColor: "#607D8B",
      fontColor: "#cfd8dc",
    },
    {
      svgUrl: mdiTeach,
      captionTextId: translationPrefix + ".carouselCaption2",
      backgroundColor: "#455a64",
      fontColor: "#cfd8dc",
    },
    {
      svgUrl: mdiDeveloperBoard,
      captionTextId: translationPrefix + ".carouselCaption3",
      backgroundColor: "#3F3D56",
      fontColor: "#cfd8dc",
    },
    {
      svgUrl: mdiAccessPointCheck,
      captionTextId: translationPrefix + ".carouselCaption4",
      backgroundColor: "#607D8B",
      fontColor: "#cfd8dc",
    },
  ];

  return (
    <div className="main-cooperation-options">
      <h1 id="mainCooperationOptions" className="section-title">
        {translate(titleId)}
      </h1>
      <div className="main-cooperation-options__texts-with-svg">
        {textWithSvgBlock.map((block: TextWithSvgBlock, i) => {
          return (
            <div className="main-cooperation-options__text-with-svg" key={i}>
              <Icon
                path={block.svgUrl}
                style={{ color: block.backgroundColor }}
              />
              <p
                style={{
                  backgroundColor: block.backgroundColor,
                  color: block.fontColor,
                }}
              >
                {translate(block.captionTextId)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="main-cooperation-options__svg-and-text">
        <img
          src={bigSvgImg}
          alt="man in front of a desk"
          className="main-cooperation-options__svg"
        />
        <p className="main-cooperation-options__text">{translate(mainTextId)}</p>
      </div>
    </div>
  );
};

export default MainCooperationOptions;
