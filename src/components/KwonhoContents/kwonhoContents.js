import React, { Component } from 'react';
import _ from 'lodash';
import ReactHtmlParser from 'react-html-parser';

import ContainerTitle from "../ContainerTitle/containerTitle";
import KwhStyle from "./common/kwhStyle";

import "./kwonhoContents.scss";

import kh_all from "../../assets/images/kwhImg/kh_all.png";
import kh_pyramid from "../../assets/images/kwhImg/kh_world.png";
import kh_tkd from "../../assets/images/kwhImg/kh_c_tea.png";
import kh_mt_1 from "../../assets/images/kwhImg/kh_c_mu_1.png";
import kh_mt_2 from "../../assets/images/kwhImg/kh_c_mu_2.png";
import kh_tae from "../../assets/images/kwhImg/kh_c_tg.png";
import kh_pal_1 from "../../assets/images/kwhImg/kh_c_pal_1.png";
import kh_pal_2 from "../../assets/images/kwhImg/kh_c_pal_2.png";
import kh_yudo from "../../assets/images/kwhImg/kh_c_y.png";
import screenshot_1 from "../../assets/images/kwhImg/kh_sh_1.png"
import screenshot_2 from "../../assets/images/kwhImg/kh_sh_2.png"
import screenshot_3 from "../../assets/images/kwhImg/kh_sh_3.png"
import screenshot_4 from "../../assets/images/kwhImg/kh_sh_4.png"

class KwonhoContents extends Component {
  render() { 
    //const { mobileSize, json } = this.props;
    const { json } = this.props;
    //console.log(json);
    for(let i = 0; i < KEYWORD.length; i++) {
      if (json === '') {
        return ''
      } else {
        KEYWORD[i].title = json.khw_keyword_data[i].title;
        KEYWORD[i].desc = json.khw_keyword_data[i].desc;
      }
    }
    for (let i = 0; i < MARTIAL_STYLE.length; i++) {
      if (json === '') {
        return ''
      } else {
        MARTIAL_STYLE[i].title = json.khw_martial_data[i].title;
        MARTIAL_STYLE[i].desc = json.khw_martial_data[i].desc;
      }
    }
    return ( 
     
      <div className="kwh_contents_container">
        <div className="kwonho_ch_bg--img" style={{ backgroundImage: "url(" + kh_all + ")" }} ></div>
        
        <div className="keyword_container">
          <ContainerTitle title="KEYWORD" color="orange" />
          <div className="keyword_box_container">
          {_.map(KEYWORD, ({ title, desc }, index) => {
            return (
              <div className="keyword_box_wrapper" key={index}>
                <p className="keyword_title">{title}</p>
                <p className="keyword_desc">{ ReactHtmlParser(desc) }</p>
              </div>  
            )
          })}
          </div>
        </div>

        <div className="worldview_container">
          <ContainerTitle title="권호 세계관" color="orange" />
          <div className="khw_pyramid_img_wrapper">
            <img className="khw_pyramid" src={kh_pyramid} alt="kwonho_pyramid_img" />
          </div>
          <div className="pyramid_desc">{ ReactHtmlParser(json.khw_pyramid_desc) }</div>
        </div>

        <div className="kwh_style_container">
        <ContainerTitle title="격투 스타일" color="orange" />
          <div className="martial_style_container">
            {_.map(MARTIAL_STYLE, ({ imgName, position, title, difficulties, desc },index) => {
              return (
                <KwhStyle 
                  key={index}
                  styleImg={imgName}
                  position={position}
                  title={title}
                  difficulties={difficulties}
                  desc={desc}
                />
              )
            })}
            
          </div>
        </div>

        <div className="screenshot_container">
          <ContainerTitle title="게임 스크린샷" color="orange" />
          <div className="screenshot_wrapper">
            <img className="ss1" src={screenshot_1} alt="screenshot1"/>
            <img className="ss2" src={screenshot_2} alt="screenshot2"/>
            <img className="ss3" src={screenshot_3} alt="screenshot3"/>
            <img className="ss4" src={screenshot_4} alt="screenshot4"/>
          </div>
        </div>
      </div>
   
    );
  }
}

const KEYWORD = [
  {
    title: '#리얼리티 3D 대전 액션',
    desc: '당시 PC 게임에서 한번도 시도되지<br/> 않았던 최초의 온라인 3D 격투게임'
  },
  {
    title: '#캐릭터의 성장',
    desc: '캐릭터 성장에 따라 습득이 가능한<br/>다양한 스킬 시스템 제공'
  },
  {
    title: '#도장 커뮤니티',
    desc: '당시 PC 게임에서 한번도 시도되지<br/> 않았던 최초의 온라인 3D 격투게임'
  },
]
const MARTIAL_STYLE = [
  {
    position: 'left',
    imgName: [kh_tkd],
    title: "태권도",
    difficulties: 1,
    desc: '빠른 속도의 발차기가 특징<br/>스킬 사용이 간단하고 빠르며 초보자가 사용하기 용이<br/>평균 데미지가 높으며, 스킬 향상 이후 금강서기로의 전환이 가능하며 심화된 공격 가능'
  },
  {
    position: 'right',
    imgName: [kh_mt_1, kh_mt_2],
    title: "무에타이",
    difficulties: 2,
    desc: '강력한 펀치 콤비네이션과 무릎차기가 특정<br/>강력한 펀치, 엘보, 니킥 콤비네이션을 보유하고 있으며, 스킬 사용 난이도가 쉬움<br/>중, 근접격투에 유리한 격투로 공격거리가 짧아 대상과의 거리 염두 필요'
  },
  {
    position: 'left',
    imgName: [kh_tae],
    title: "태극권",
    difficulties: 3,
    desc: '빠른 손놀림 보다는 심리전을 원하는 플레이어게 적합한 캐릭터<br/>반격기 위주의 격투를 벌이며, 연속 스킬과 단타계열이 적절히 배합되어 있으나 공격력이 낮음<br/>상대의 타이밍을 이용해 효과적인 반격기 사용'
  },
  {
    position: 'right',
    imgName: [kh_pal_1, kh_pal_2],
    title: "팔극권",
    difficulties: 4,
    desc: '접근전에 강한 캐릭터로 정확한 타이밍과 스킬입력이 필요<br/>단타계열의 스킬을 사용하며 발동후 빈틈으로 플레이 난이도가 있음<br/>정타 시킬 경우 막강한 데미지를 뽑아내어 최고의 타격감을 발휘'
  },
  {
    position: 'left',
    imgName: [kh_yudo],
    title: "유도",
    difficulties: 4,
    desc: '정확한 타이밍과 상대의 심리를 꿰뚫어야 능숙하게 사용 가능<br/>그래플링(잡기) 스타일에 특화되어 있으며, 치명타 공격은 없지만 허점 공략을 통해 강력하고 연속적인 공격 가능<br/>타격기가 낮고 공격거리가 짧아 대상의 심리를 잘 파악하여 빈틈을 공략해야 하는 상급기술 캐릭터'
  }
]

export default KwonhoContents;