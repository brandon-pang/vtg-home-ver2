import React from 'react';
import _ from "lodash";
import { Motion, spring } from "react-motion";

import Delay from "../DelayAnimation/delayAnimation";
import HistoryTopic from "./common/historyTopic";
import WhenInView from "../WhenInView/whenInView";

import "./historyBody.scss";

const HistoryBody = ({ historyData, tabletSize, mobileSize }) => {
  return (
    <div>
      {_.map(historyData, ({ year, contents }, index) => {
        return (
          <div className="history_row" key={index}>
            <div className="history_header">
              <div className="history_tip" key={index + 1}> - </div>
              <div className="history_year" key={year}>{year}</div>
            </div>
            {tabletSize || mobileSize ?
              <div className="history_container">
                {_.map(contents, ({ month, topic }, index) => {
                  return (
                    <div className="history_wrapper" key={index}>
                      {month ? <div className="history_month">{month}</div> : null}
                      <HistoryTopic topic={topic} />
                    </div>
                  )
                })
                }
              </div>
              :
              <WhenInView>
                {({ isInView }) =>
                  <Delay hide={isInView} key={index} initial={0} value={1} period={index * 50}>
                    {delayed =>
                      <Motion
                        defaultStyle={{ opacity: 0 }}
                        style={{ opacity: spring(delayed) }}
                      >
                        {value =>
                          <div
                            key={index}
                            className="history_container"
                            style={{ opacity: value.opacity }}
                          >
                            {_.map(contents, ({ month, topic }, index) => {
                              return (
                                <div className="history_wrapper" key={index}>
                                  <div className="history_month">{month}</div>
                                  <HistoryTopic topic={topic} />
                                </div>
                              )
                            })
                            }
                          </div>
                        }
                      </Motion>
                    }
                  </Delay>
                }
              </WhenInView>
            }
          </div>

        );
      })}
    </div>
  )
}

export default HistoryBody;
