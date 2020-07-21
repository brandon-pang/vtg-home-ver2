import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import ModalContents from "../ModalContents/modalContents";

// modal game contents
import BSM_modal_img from "../../assets/images/modal_games/popup_bsm.png";
import BS_modal_img from "../../assets/images/modal_games/popup_bsr.png";
import DK_modal_img from "../../assets/images/modal_games/popup_dkr.png"; 
import KWHO_modal_img from "../../assets/images/modal_games/popup_kwho.png";
import LT_modal_img from "../../assets/images/modal_games/popup_lt.png";
import UWO_modal_img from "../../assets/images/modal_games/popup_UWO.png";
import WOZ_modal_img from "../../assets/images/modal_games/popup_woz.png";
import WR_modal_img from "../../assets/images/modal_games/popup_wr.png";

import "./modalContainer.scss";


const ModalContainer = ({ isModalOpen, closeModal, session, mobileSize, localeJson, history, location }) => {
  const modalRef = useRef('content');
  useEffect(() => {
    assignLang(); // componentdidupdate
    return () => { //componentWillUnmount
      assignLang();
      closeModal();
    }
  }, [localeJson])
  const assignLang = () => {
    for (let i = 0; i < GAME_CONTENTS.length; i++) {
      if (localeJson === '' || localeJson === undefined) {
        return null
      } else {
        GAME_CONTENTS[i].title = localeJson.game_content_data[i].title;
        GAME_CONTENTS[i].genre = localeJson.game_content_data[i].grenre;
        GAME_CONTENTS[i].features = localeJson.game_content_data[i].features;
        GAME_CONTENTS[i].developer = localeJson.game_content_data[i].developer;
        GAME_CONTENTS[i].publisher = localeJson.game_content_data[i].publisher;
        GAME_CONTENTS[i].releaseDate = localeJson.game_content_data[i].releaseDate;
        GAME_CONTENTS[i].desc = localeJson.game_content_data[i].desc;
        GAME_CONTENTS[i].gameBtn = localeJson.game_content_data[i].gameBtn;
        GAME_CONTENTS[i].gameStore = localeJson.game_content_data[i].gameStore;
      }
    }
  }
  const renderModal = () => {
    if (!isModalOpen) {
      return null;
    }
    const gameContentsData = GAME_CONTENTS[session];
    return (
      <ModalContents
        closeModal={closeModal}
        extra={gameContentsData.extra}
        imgUrl={gameContentsData.imgUrl}
        title={gameContentsData.title}
        genre={gameContentsData.genre}
        features={gameContentsData.features}
        developer={gameContentsData.developer}
        publisher={gameContentsData.publisher}
        releaseDate={gameContentsData.releaseDate}
        desc={gameContentsData.desc}
        gameBtn={gameContentsData.gameBtn}
        gameStore={gameContentsData.gameStore}
        mobileSize={mobileSize}
        json={localeJson}
      />
    );
  }
  return (
    <div className="modal">
      <Modal
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={closeModal}
        className="games_modal"
      >
        <div
          className="dialog__content"
          ref={modalRef}
        >
          {renderModal()}
        </div>
      </Modal>
    </div>
  )
}

const GAME_CONTENTS = [
  {
    extra: false,
    imgUrl: BSM_modal_img,
    title: 'Blackshot Mobile[블랙샷 모바일]',
    genre: 'Military F2P MMOFPS',
    features: 'Quick and aggressive game play, tactical skill upgrade system, numerous game modes, character customization',
    developer: '버티고우 게임즈',
    publisher: '파파야 플레이',
    releaseDate: 'November 2007',
    desc: '버티고우 게임즈의 가장 성공한 FPS 게임인 Blackshot은 자체적으로 개발되었습니다. 빠른 속도감과 전략적인 게임 플레이를 게임을 통해 즐길 수 있습니다. Blackshot은 PapayaPlay를 통해 동남아와  글로벌 서비스로 운영되고 있습니다.',
    gameBtn: [
      {
        title: 'Blackshot SEA Website',
        url: 'https://blackshot.papayaplay.com/bssea.do'
      },
      {
        title: 'Blackshot SEA Website',
        url: 'https://blackshot.papayaplay.com/bssea.do'
      }
    ],
    gameStore: [
      {
        store: "google",
        link: "https://play.google.com/store/apps/details?id=com.vg.bsm"
      },
      {
        store: "apple",
        link: "https://itunes.apple.com/app/id1457172194?mt=8"
      }
    ]
  },
  {
    extra: false,
    imgUrl: BS_modal_img,
    title: 'Blackshot [블랙샷]',
    genre: 'Military F2P MMOFPS',
    features: 'Quick and aggressive game play, tactical skill upgrade system, numerous game modes, character customization',
    developer: '버티고우 게임즈',
    publisher: '버티고우 게임즈',
    releaseDate: 'November 2007',
    desc: '버티고우 게임즈의 가장 성공한 FPS 게임인 Blackshot은 자체적으로 개발되었습니다. 빠른 속도감과 전략적인 게임 플레이를 게임을 통해 즐길 수 있습니다. Blackshot은 PapayaPlay를 통해 동남아와  글로벌 서비스로 운영되고 있습니다.',
    gameBtn: [
      {
        title: 'Blackshot SEA Website',
        url: 'https://blackshot.papayaplay.com/bssea.do'
      },
      {
        title: 'Blackshot GLobal Website',
        url: 'https://blackshot.papayaplay.com/bsglb.do'
      }
    ]
  },
  {
    extra: false,
    imgUrl: DK_modal_img,
    title: 'DEKARON [데카론]',
    genre: 'Fantasy Action MMORPG ',
    features: 'Various character classes, upgrades, massive PvP battles, instanced dungeons, abundance of in-game customization contents',
    developer: 'UbiFUN',
    publisher: '버티고우 게임즈',
    releaseDate: '',
    desc: '데카론은 2개의 달이 비추는 대륙, 트리에스테에서 어둠(카론)과 대립하는 세계관을 가진 MMORPG 게임으로서 12개의 클래스를 선택해 캐릭터를 생성 할 수 있습니다. 캐릭터 육성을 통해 일정 레벨에 도달한 플레이어들은 ‘DK스퀘어’ 안에서 모든 유저들과  PVP 전투를 경험할 수 있습니다. 펫의 육성, 장비의 강화 등 MMORPG 에서 가능한 모든 것들을 개성있는 캐릭터를 이용하여 경험해보세요. 현재 데카론은  PapayaPlay를 통해서 플레이 가능합니다.',
    gameBtn: [
      {
        title: 'Dekaron Website',
        url: 'https://dekaron.papayaplay.com/dekaron.do'
      }
    ]
  },
  {
    extra: false,
    imgUrl: WR_modal_img,
    title: 'WarRock [워록]',
    genre: 'Multiplayer FPS',
    features: '17 game modes spanning over 90 distinct maps, customizable characters/loadouts, a hardcore Clan League and more',
    developer: 'Dream Execution',
    publisher: '버티고우 게임즈',
    releaseDate: '',
    desc: '워록은 군용차량을 이용한 대규모 전투가 가능한 기존 FPS 게임과는 차별성이 있는 게임 입니다. 당시 국내에서 보기 힘든 탄도학을 적용하는 등 게임 내 리얼리티를 위한  새로운 시도를 하였습니다.  중동을 배경으로한 방대한 맵에서는 탱크, 전투헬기, 제트기가 등장하여 전쟁다운 전쟁을 플레이 할 수 있고,  몰입도 높은 타격감을 선사합니다. 현재 워록는 PapayaPlay를 통해서 플레이 가능합니다.  ',
    gameBtn: [
      {
        title: 'War Rock Website',
        url: 'https://warrock.papayaplay.com/warrock.do'
      }
    ]
  },
  {
    extra: false,
    imgUrl: LT_modal_img,
    title: 'La Tale [라 테일]',
    genre: 'Fantasy MMORPG',
    features: '9 distinct base character classes each with an extensive tree of skills and subclass specialities ',
    developer: 'Actoz Soft',
    publisher: '버티고우 게임즈',
    releaseDate: '',
    desc: '라테일은 횡스크롤 방식으로 이루어진 캐주얼 액션 MMORPG로,  간단한 조작으로 다양한 액션을 즐길 수 있는 게임 입니다. 50개 이상의 직업과 클래스를 선택하여 자신만의 캐릭터를 만들고, 전 세계의 영웅들과 함께하며, 마법대륙으로 모험을 떠나보세요. 라테일은 PapayaPlay를 통해서 플레이 가능합니다.  ',
    gameBtn: [
      {
        title: 'La Tale Website',
        url: 'https://latale.papayaplay.com/latale.do'
      }
    ]
  },
  {
    extra: false,
    imgUrl: UWO_modal_img,
    title: 'Uncharted Waters Online [대항해 시대 온라인]',
    genre: 'MMORPG',
    features: 'Hundreds of game objectives(more than 80 professions and more than 100 skills) to master, buy/build/customize ships from across the ages, participate in massive PvPsea fights with hundreds of other ships',
    developer: 'Koei Tecmo',
    publisher: '버티고우 게임즈',
    releaseDate: '',
    desc: '대항해시대 온라인은  16세기 ~ 19세기 배경의 MMORPG 게임으로 플레이어들은 대의 불가사의 탐험, 유럽과 동아시아로의 무역, 바다위에서의 해전을 경험할 수 있습니다. 50종 이상의 직업, 100종 이상의 스킬로 자신만의 캐릭터를 육성할 수 있고, 다른 플레이어들과 함대를 구성하여 다양한 모험을 즐 길 수 있습니다. 지역과 시간에 따라 변화하는 바다를 실감나게 표현하여 해수의 변화, 바람의 변화 등을 실제로 느낄 수 있으며 내륙으로는 나일강, 피라미드 등을 직접 마주 할 수 있습니다. 현재 대항해시대 온라인은  PapayaPlay를 통해서 플레이 가능합니다.',
    gameBtn: [
      {
        title: 'Uncharted Waters Online Website',
        url: 'https://uwo.papayaplay.com/uwo.do'
      }
    ]
  },
  {
    extra: false,
    imgUrl: WOZ_modal_img,
    title: 'War Of Zombie [워 오브 좀비]',
    genre: 'Military F2P MMOFPS',
    features: 'Intelligent AI, PVP/PVZ/PVE game modes',
    developer: '',
    publisher: '',
    releaseDate: 'RELEASE DATE: May 2013',
    desc: 'War Of Zombie는 버티고우 게임즈와 Tencent와 파트너쉽을 맺고 개발한 게임으로 기존의 좀비게임과 차별화 됩니다. Intelligent AI를 적용한 다양한 PvE모드와 블랙샷의 타격감을 계승한 게임입니다.',
  },
  {
    extra: true,
    imgUrl: KWHO_modal_img,
    title: 'Kwonho [권호]',
    genre: 'Online Fighting',
    features: 'Customizable characters',
    developer: '버티고우 게임즈',
    publisher: '버티고우 게임즈',
    releaseDate: 'Mid-2006',
    desc: '권호는 버티고우 게임즈에서 자체적으로 개발한 실시간 온라인 3D 격투 게임입니다. 2006년 당시 기존의 온라인 대전격투 게임 장르에서 가질 수 없었던 캐릭터 성장 시스템, 성장의 다양성, 특유의 게임요소들을 결합하여 차별화된 온라인 아케이드 격투게임으로 개발 되었습니다. 게임 내에서는 팔극권, 태극권, 태권도, 유도 등의 고전 무술 동작을 사용한 전투를 맛볼 수 있으며 무에타이, 이종 격투기의 현대 격투스킬을 경험할 수 있습니다.',
  }
]

export default ModalContainer;

