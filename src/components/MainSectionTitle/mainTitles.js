import React from "react";
import ReactHtmlParser from 'react-html-parser';
import "./mainTitle.scss";

// export const TEXT_TYPES = { 
//   GAMES: "games",
//   PUBLISHING: "publishing",
//   NEWS: "news"
// };

const MainTitle = ({ title, desc, name }) => {
  return (
    <div className="main_title_container">
      <p className="title">{ ReactHtmlParser(title) }</p>
      <p className={`${name}-desc`}>{ ReactHtmlParser(desc) }</p>
    </div>
  );
};

export default MainTitle;
