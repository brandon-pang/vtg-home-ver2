import React from "react";
import ReactHtmlParser from 'react-html-parser';

const HistoryTopic = ({ topic, index }) => {
  return <div className="history_topic" key={index}>{ ReactHtmlParser(topic) }</div>;
}; 

export default HistoryTopic;
