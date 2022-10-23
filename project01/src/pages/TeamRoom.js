import React, { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal/Modal";
import Modal2 from "../components/Modal/Modal2"
import '../styles/TeamRoom.css'
import {Link} from "react-router-dom";

const TeamRoom = () => {
  const [modalCal, setModalCal] = useState(false);
  const openModalCal = () => {
    setModalCal(true);
  };
  const closeModalCal = () => {
    setModalCal(false);
  };

  const [modalVote, setModalVote] = useState(false);
  const openModalVote = () => {
    setModalVote(true);
  };
  const closeModalVote = () => {
    setModalVote(false);
  };


  return (
    <div>
      <div className="calChatBox">
      <div className="calendarBox">캘린더</div>
      <div className="chatBox">채팅</div>
      </div>
      <div className="scheduleVoteBox">
        <h3 className="scheduleHistory" 
        onClick={openModalCal}>
          일정내역 
        </h3>
        <Modal 
        open={modalCal} 
        close={closeModalCal} 
        header="일정">
          <h3>다가오는 일정</h3>
          <div className="scheduleList"></div>
          <h3>지난 일정</h3>
          <div className="scheduleList"></div>
        </Modal>
        <h3 className="voteHistory"
        onClick={openModalVote}>
          투표내역
        </h3>
        <Modal2
        open={modalVote} 
        close={closeModalVote} 
        header="투표">
          <h3>다가오는 투표</h3>
          <div className="voteList"></div>
          <h3>지난 투표</h3>
          <div className="voteList"></div>
        </Modal2>
      </div>
      <div className="teamSetting">
      <Link to='/teamSetting'>
        <Button type='basic'>팀관리</Button>
        </Link>

      </div>
    </div>
  );
};

export default TeamRoom;