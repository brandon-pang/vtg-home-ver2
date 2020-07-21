import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import ReactHTMLParser from 'react-html-parser';
import { useModal } from '../../contexts/modal';

import ApplyBtn from "../EmailList/emailList"

import closeImg from "../../assets/images/acsy/ic_cancel_b.png";

import "./hireModalContainer.scss";

const HireModalContainer = ({ hireData, session, mobileSize, email, isModal, closeModal, history }) => {
  const modalRef = useRef('content');
  useEffect(() => {
    return () => { //componentWillUnmount
      closeModal();
    }
  }, [])  
  const renderModal = () => {
    if (!isModal) { return null; }
    const hireContentsData = hireData[session];
    return (
      <div className="hire_position_container_modal">
        <div className="closeModal_wrapper" onClick={() => closeModal()}>
          <img className="closeImg" src={closeImg} alt="close window" />
        </div>
        <div className="modal_header">
          <div className="header_team">{hireContentsData.title.rendered}</div>
          <div className="header_row2">
            <div className="header_position">{hireContentsData.hire_department}{' '}/</div>
            <div className="header_contury">{' '}{hireContentsData.hire_location}</div>
          </div>
          <div className="header_divline"></div>
        </div>
        <div className="contents_body">
          <p>{ReactHTMLParser(hireContentsData.content.rendered)}</p>
        </div>

        <div className="applyBtn_wrapper">
          <ApplyBtn mobileSize={mobileSize} address={email} />
        </div>
      </div>
    )
  }

  return (
    <div className="modal">
      <Modal
        isOpen={isModal}
        onRequestClose={closeModal}
        className="hire_modal"
      >
        <div
          className="dialog__content"
          ref={modalRef}
          style={{ width: '100vw', height: '100vh', backgroundColor: '#fff', overflowY: 'scroll' }}
        >
          {renderModal()}
        </div>
      </Modal>
    </div>
  )
}

// export default withRouter(useModal(({ state, actions }) => ({
//   isModal: state.isModal,
//   session: state.session,
//   openModal: actions.openModal,
//   closeModal: actions.closeModal
// }))(HireModalContainer))

export default useModal(({ state, actions }) => ({
  isModal: state.isModal,
  session: state.session,
  openModal: actions.openModal,
  closeModal: actions.closeModal
}))(HireModalContainer);
